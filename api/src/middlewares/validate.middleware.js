export const validate = (schemas) => (req, res, next) => {
  try {
    let errors = [];

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) errors = result.error?.issues || [];
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) errors = result.error?.issues || [];
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) errors = result.error?.issues || [];
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Invalid data",
        errors: errors.map((e) => ({ field: e.path.join("."), message: e.message })),
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
