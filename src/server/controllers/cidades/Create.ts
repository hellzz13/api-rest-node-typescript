import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as yup from "yup";

interface ICidade {
  nome: string;
  estado: string;
}

const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(3),
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  let dataValidated: ICidade | undefined = undefined;
  console.log(req.body);

  try {
    dataValidated = await bodyValidation.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    // joga os error para cada chave com erro
    yupError.inner.forEach((error) => {
      if (!error.path) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).send({
      error: {
        default: errors,
      },
    });
  }
  return res.send({ message: "created data!" });
};
