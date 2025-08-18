export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isMember");
    localStorage.removeItem("isMemberBureau");
    localStorage.removeItem("isParent");
    localStorage.removeItem("userId");
}
