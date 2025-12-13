export const validateEmail = (email) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    //simple regular expression to validate email
    return regex.test(email);
}

export const getInitials = (title) => {
    if (!title) {
        return "";
    } //to show in session card 

    const  words = title.split(" ");
    let initials = "";
    for(let i = 0; i < Math.min(words.length, 2); i++){
        initials += words[i][0];
    }
    return initials.toUpperCase();
};