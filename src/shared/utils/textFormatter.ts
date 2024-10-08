import { GetCurrentUserResponse } from "@/app/api/userApi.ts";

export const getCurrentUserName = (currentUser: GetCurrentUserResponse) => {
  if (currentUser.name) {
    return currentUser.name;
  }

  const [temporaryNameFromEmail] = currentUser.email?.split("@") || [""];
  return temporaryNameFromEmail;
};
