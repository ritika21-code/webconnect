

export const formatDate = (date) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}
export const downloadMedia = async (e, originalImage) => {
    e.preventDefault();
    try {
        fetch(originalImage)
        .then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;

            const nameSplit = originalImage.split("/");
            const duplicateName = nameSplit.pop();

            // the filename you want
            a.download = "" + duplicateName + "";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => console.log('Error while downloading the image ', error))

    } catch (error) {
        console.log('Error while downloading the image ', error);
    }
}
export const reducerCases = {
    SET_USER_INFO: "SET_USER_INFO",
    SET_NEW_USER: "SET_NEW_USER",
    SET_ALL_CONTACTS_PAGE: "SET_ALL_CONTACTS_PAGE",
    CHANGE_CURRENT_CHAT_USER: "CHANGE_CURRENT_CHAT_USER",
    SET_MESSAGES: "SET_MESSAGES",
    SET_SOCKET: "SET_SOCKET",
    ADD_MESSAGE: "ADD_MESSAGE",
    SET_MESSAGE_SEARCH: "SET_MESSAGE_SEARCH",
    SET_USER_CONTACTS: "SET_USER_CONTACTS",
    SET_ONLINE_USERS: "SET_ONLINE_USERS",
    SET_CONTACT_SEARCH: "SET_CONTACT_SEARCH",
    SET_VIDEO_CALL: "SET_VIDEO_CALL",
    SET_VOICE_CALL: "SET_VOICE_CALL",
    END_CALL: "END_CALL",
    SET_INCOMING_VOICE_CALL: "SET_INCOMING_VOICE_CALL",
    SET_INCOMING_VIDEO_CALL: "SET_INCOMING_VIDEO_CALL",
    SET_EXIT_CHAT: "SET_EXIT_CHAT",
  };