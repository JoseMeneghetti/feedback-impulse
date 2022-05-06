import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedBack = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedBack.execute({
        type: "BUG",
        comment: "exemplo test",
        screenshot: "data:image/png;base64adasdsadasd",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit without type", async () => {
    await expect(
      submitFeedBack.execute({
        type: "",
        comment: "exemplo test",
        screenshot: "data:image/png;base64adasdsadasd",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit without comment", async () => {
    await expect(
      submitFeedBack.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64adasdsadasd",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback with a invalid screenshot", async () => {
    await expect(
      submitFeedBack.execute({
        type: "BUG",
        comment: "exemplo teste",
        screenshot: "123",
      })
    ).rejects.toThrow();
  });
});
