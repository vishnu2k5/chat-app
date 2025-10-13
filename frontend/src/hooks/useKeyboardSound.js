const keyStorkeSound = [
    new Audio("/sounds/keystroke2.mp3"),
    new Audio("/sounds/keystroke1.mp3"),
    new Audio("/sounds/keystroke3.mp3"),
    new Audio("/sounds/keystroke4.mp3"),
];

function playKeyboardSound() {
    const playRandomsound = ()=>{
        const keyStorkeSoundIndex = Math.floor(Math.random()*keyStorkeSound.length);
        keyStorkeSound[keyStorkeSoundIndex].currentTime=0

        keyStorkeSound[keyStorkeSoundIndex].play().catch((err)=>console.log("faile audio",err));

    }
    return { playRandomsound };
}

export default playKeyboardSound;