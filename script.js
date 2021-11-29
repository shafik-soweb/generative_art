const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




// function color() {
//     return `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
// }

// console.log(canvas)
class Root { 

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 4-2;
        this.speedY = Math.random() * 4-2;
        this.maxSize = Math.random() * 7 + (Math.random() * 9);
        // this.minSize = Math.random() * 40;
        this.size = 0;
        this.angle = Math.random() * 10;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        this.size += 0.04;
        // this.angle += 0.1;
       
            if (this.size < this.maxSize) {
        
                ctx.beginPath()
                ctx.rect(this.x, this.y,10,10)
                ctx.fillStyle = 'rgb(200,230,100)'
                ctx.fill()
                ctx.strokeStyle = 'rgb(200,230,1)'
                ctx.stroke()
                requestAnimationFrame(this.update.bind(this))
            }

    }
}

// function drawShape(radius) {
//     ctx.beginPath()
//     ctx.save()
//     ctx.translate(canvas.width / 2, canvas.height / 2 - radius)
//     ctx.moveTo(0, 0)
//     ctx.lineTo(0, 0 - radius)
//     ctx.rotate(Math.PI / 3)
//     ctx.lineTo(0, 0 - radius)
//     ctx.rotate(Math.PI / 3)
//     ctx.lineTo(0, 0 - radius)
//     ctx.rotate(Math.PI / 3)
//     ctx.lineTo(0, 0 - radius)
//     ctx.rotate(Math.PI / 3)
//     ctx.lineTo(0, 0 - radius)
//     ctx.rotate(Math.PI / 3)
//     ctx.lineTo(0, 0 - radius)
//     ctx.rotate(Math.PI / 3)
//     ctx.lineTo(0, 0 - radius)
//     ctx.restore()
//     // ctx.closePath()
//     ctx.stroke()
// }

// startRecording();


// class FlowFieldEffect{
//     #ctx
//     #width
//     #height
//     constructor(ctx, width, height) {
//         this.#ctx = ctx;
//         this.#width = width;
//         this.#height = height;
//     }
//     #draw(){
       
//     }
//     animate() {
//         this.#draw()
//         requestAnimationFrame(this.animate.bind(this))
//     }
// }
















window.addEventListener('keypress', function (e) {
    if (e.key === 's') {
        startRecording()
    }
})
window.addEventListener('mousemove', function (e) {
    // for (let i = 300; i < 1920 - 300; i+=80){
    //     for (let j = 300; j < 1080 - 300; j+=80){
    //         const root = new Root(i, j);
    //         root.update()
    //     }
    // }
    
    const root = new Root(e.x, e.y)
    root.update()
})

// // function save() {
// //     const data = canvas.toDataURL()
// //     console.log(data)
    
// // }
const button = document.getElementById('button')

// // button.addEventListener('click', function () {
// //     const a = document.createElement('a');
// //     document.body.appendChild(a);
// //     a.href = canvas.toDataURL()
// //     a.download = 'canvas.png';
// //     a.click()
// // });

function startRecording() {
  const chunks = []; // here we will store our recorded media chunks (Blobs)
  const stream = canvas.captureStream(); // grab our canvas MediaStream
    const rec = new MediaRecorder(stream, { videoBitsPerSecond: 4800000 }); // init the recorder

  // every time the recorder has new data, we will store it in our array
  rec.ondataavailable = e => chunks.push(e.data);
  // only when the recorder stops, we construct a complete Blob from all the chunks
  rec.onstop = e => exportVid(new Blob(chunks, {type: 'video/mp4'}));
  
  rec.start();
//   setTimeout(()=>rec.stop(), 3000); // stop recording in 3s
    window.addEventListener('keypress', function (e) {
    if (e.key === 'e') {
        rec.stop()
    }
})
}

function exportVid(blob) {
  const vid = document.createElement('video');
  vid.src = URL.createObjectURL(blob);
  vid.controls = true;
//   document.body.appendChild(vid);
  const a = document.createElement('a');
  a.download = 'myvid.mp4';
  a.href = vid.src;
  a.click()
}
