import request from "request";

export const convert = async (docUrl: string) => {
  const { data } = await new Promise((resolve, reject) =>
    request.get(docUrl, { encoding: null }, (err, _, data) => {
      if (err) {
        reject(err);
      } else {
        resolve({ data });
      }
    })
  );

  const { response } = await new Promise((resolve, reject) => {
    const req = request.post(
      `https://doc-rotary.herokuapp.com/upload?from=doc-giggle`,
      { encoding: null },
      (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve({ response });
        }
      }
    );

    const form = req.form();
    form.append("file", data, {
      filename: new URL(docUrl).pathname.substr(1)
    });
  });

  return response;
};
