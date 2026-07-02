// Typing animation
    const texts = ["a Data Engineer", "Python Developer", "Software Engineer" ," Data Analyst"];
    let count = 0, index = 0, currentText = "", letter = "";
    const typingElement = document.getElementById("typing");

    function type() {
      if (count === texts.length) count = 0;
      currentText = texts[count];
      letter = currentText.slice(0, ++index);
      typingElement.textContent = letter;
      if (letter.length === currentText.length) {
        setTimeout(() => { index = 0; count++; typingElement.textContent = ""; type(); }, 1200);
      } else {
        setTimeout(type, 120);
      }
    }
    type();

    // Fractal background
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let maxLevel = 5, branches = 2, sides = 5;
    let gapBetweenTwoBranches = Math.random() * 150 + 150;
    let lengthOfTheBranches = Math.random() * 150 + 150;
    let spread = Math.random();
    let angle = Math.PI * 2 * spread;
    ctx.translate(canvas.width / 2, canvas.height / 2);

    function drawLine(level) {
      if (level > maxLevel) return;
      if (level !== 0) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(lengthOfTheBranches, 0);
        ctx.stroke();
      }
      for (let i = 1; i < branches + 1; i++) {
        ctx.save();
        ctx.translate(gapBetweenTwoBranches * i, 0);
        ctx.scale(0.5, 0.5);
        ctx.save();
        ctx.rotate(angle);
        drawLine(level + 1);
        ctx.restore();
        ctx.save();
        ctx.rotate(-angle);
        drawLine(level + 1);
        ctx.restore();
        ctx.restore();
      }
    }

    function drawFractal() {
      ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
      for (let i = 0; i < sides; i++) {
        drawLine(0);
        ctx.rotate((Math.PI * 2) / sides);
      }
    }
    drawFractal();

    window.addEventListener("click", () => {
      maxLevel = 5; branches = 2; sides = 5;
      gapBetweenTwoBranches = Math.random() * 150 + 150;
      lengthOfTheBranches = Math.random() * 150 + 150;
      spread = Math.random(); angle = Math.PI * 2 * spread;
      drawFractal();
    });

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      drawFractal();
    });

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
    const navLinkItems = document.querySelectorAll("#nav-links a");
    navLinkItems.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });

    // Google Sheet form submission
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzWhcYBC3qLTXIe56kFb6-6yh9-eAHQKK6iiyiSWygqIUaUL3xZSScvJA9UJKIdP2Vq/exec';
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById("msg");

 form.addEventListener("submit", (e) => {
  e.preventDefault();

  Toastify({
    text: "Sending message...",
    duration: 2000,
    gravity: "top",
    position: "right",
    backgroundColor: "#1c6ea4",
  }).showToast();

  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
  })
    .then(() => {
      Toastify({
        text: "✅ Message sent successfully!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#22c55e",
      }).showToast();

      form.reset();
    })
    .catch(() => {
      Toastify({
        text: "❌ Error sending message!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ef4444",
      }).showToast();
    });
});


    // ✨ NEW: JavaScript for Scroll-Triggered Zoom Animation ✨
    const scrollElements = document.querySelectorAll(".scroll-zoom");

    const elementInView = (el, dividend = 1) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
      );
    };

    const elementOutofView = (el) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
      );
    };

    const displayScrollElement = (element) => {
      element.classList.add("visible");
    };

    const hideScrollElement = (element) => {
      element.classList.remove("visible");
    };

    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
          displayScrollElement(el);
        } else if (elementOutofView(el)) {
        
        }
      });
    };

    window.addEventListener("scroll", () => {
      handleScrollAnimation();
    });
    handleScrollAnimation();
