import { Request, Response } from "express";

import * as yup from "yup";

interface ICidade {
  nome: string;
}

const bodyValidation: yup.Schema<ICidade> = yup
  .object()
  .shape({ nome: yup.string().required().min(3) });

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  let dataValidated: ICidade | undefined = undefined;
  console.log(req.body);

  try {
    dataValidated = await bodyValidation.validate(req.body);
  } catch (error) {
    const yupError = error as yup.ValidationError;

    return res.send({
      error: {
        default: yupError.message,
      },
    });
  }
  return res.send("create!");
};
