export const getUser = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    name: "John Doe",
    email: "john.doe@example.com",
  };
};
