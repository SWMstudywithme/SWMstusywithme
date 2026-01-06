// Variabelen
let localVideo = document.getElementById('localVideo');
let remoteVideo = document.getElementById('remoteVideo');
let startBtn = document.getElementById('startBtn');
let nextBtn = document.getElementById('nextBtn');

let localStream;
let peerConnection;
const config = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] };

let startTime;
const minMinutes = 15; // MINIMALE TIJD IN MINUTEN

// START knop actie
startBtn.onclick = async () => {
  startBtn.disabled = true;
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  localVideo.srcObject = localStream;

  peerConnection = new RTCPeerConnection(config);
  localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
  peerConnection.ontrack = e => remoteVideo.srcObject = e.streams[0];

  // Start timer
  startTime = Date.now();
  nextBtn.disabled = true;

  setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000 / 60; // minuten
    if (elapsed >= minMinutes) {
      nextBtn.disabled = false;
    }
  }, 1000);

  alert("Studiesessie gestart! Je kunt pas naar een andere studiemaat na 15 minuten.");
};

// Placeholder voor toekomstige matchmaking functie
nextBtn.onclick = () => {
  alert("Volgende studiemaat functie komt later. Timer voltooid!");
};
