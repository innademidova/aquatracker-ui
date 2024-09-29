import { GetCurrentUserResponse } from "@/app/userApi"

export const getCurrentUserName = (currentUser: GetCurrentUserResponse) => {
    const regex = /^([^@]+)/;
    const temporaryNameFromEmail = currentUser.email.match(regex)![0];
    return currentUser.name ?? temporaryNameFromEmail;
}