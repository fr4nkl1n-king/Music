const uploadBtn = document.getElementById("btnUpload");
const fileInput = document.getElementById("uploadMusic");
const audio = document.getElementById("audioPlayer");
const songList = document.getElementById("songList");

// abrir selector
uploadBtn.onclick = () => fileInput.click();

// subir archivo
fileInput.onchange = async () => {
    const file = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("song", file);

    await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData
    });

    loadSongs();
};

// cargar canciones
async function loadSongs() {
    const res = await fetch("http://localhost:3000/songs");
    const songs = await res.json();

    songList.innerHTML = "";

    songs.forEach(song => {
        const div = document.createElement("div");
        div.style.cursor = "pointer";
        div.style.padding = "10px";
        div.innerText = song;

        div.onclick = () => {
            audio.src = `http://localhost:3000/music/${song}`;
            audio.play();

            document.querySelector(".player-text div").textContent = song;
        };

        songList.appendChild(div);
    });
}

// iniciar
loadSongs();