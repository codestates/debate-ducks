export default function canvasRecorder() {
  let stream;
  const recordedBlobs = [];
  let blob;
  let canvasUrl;
  let supportedType = null;
  let mediaRecorder = null;

  function createStream(canvas) {
    stream = canvas.captureStream();
  }

  function startRecording() {
    let types = ["video/webm", "video/webm,codecs=vp9", "video/vp8", "video/webm;codecs=vp8", "video/webm;codecs=daala", "video/webm;codecs=h264", "video/mpeg"];

    for (let i in types) {
      if (MediaRecorder.isTypeSupported(types[i])) {
        supportedType = types[i];
        break;
      }
    }

    if (supportedType == null) {
      console.log("No supported type found for MediaRecorder");
    }

    let options = {
      mimeType: supportedType,
      videoBitsPerSecond: 25000000000,
    };

    recordedBlobs.splice(0);

    try {
      mediaRecorder = new MediaRecorder(stream, options);
      console.log(mediaRecorder); //
    } catch (err) {
      console.log("startRecording: ", err);
      return;
    }

    mediaRecorder.onstop = () => {
      blob = new Blob(recordedBlobs, { type: supportedType });
      canvasUrl = window.URL.createObjectURL(blob);
      console.log("blob", blob); //
      console.log("canvasUrl", canvasUrl); //
    };

    mediaRecorder.ondataavailable = (ev) => {
      if (ev.data && ev.data.size > 0) {
        console.log("ev.data", ev.data); //
        recordedBlobs.push(ev.data);
      }
    };

    mediaRecorder.start();
  }

  function stopRecording() {
    mediaRecorder.stop();
  }

  return {
    createStream,
    startRecording,
    stopRecording,
    canvasUrl,
  };
}
