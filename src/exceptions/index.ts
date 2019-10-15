export const EnvException = (envName: string) => {
  throw new Error(`'${envName}' environment variable missing!`);
};
