const sections = document.querySelectorAll("main .sections");
const navLinks = document.querySelectorAll(".aside-nav ul a");
const marQuee = document.getElementById("marquee");

const icons = [
    "./assets/svgs/css.svg",
    "./assets/svgs/html.svg",
    "./assets/svgs/javascript.svg",
    "./assets/svgs/react.svg",
    "./assets/svgs/tailwind.svg",
];

function onScroll() {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 350) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", onScroll);

onScroll();

if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const id = entry.target.id;

                navLinks.forEach((link) => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${id}`,
                    );
                });
            });
        },
        {
            root: null,
            threshold: 0.4, // 40% visible = active
        },
    );

    sections.forEach((section) => observer.observe(section));
}
// icons / marquee
if (marQuee) {
    icons.forEach((src, i) => {
        const li = document.createElement("li");
        const img = document.createElement("img");

        img.src = src;
        img.alt = "Icon";
        img.width = 40;
        img.height = 40;
        img.decoding = "async";

        li.appendChild(img);

        const animationDelay = i * 1;
        li.style.animation = `marquee 5s linear infinite ${animationDelay}s`;

        marQuee.append(li);
    });

    marQuee.addEventListener("mouseenter", () => {
        marQuee.querySelectorAll("li").forEach((li) => {
            li.style.animationPlayState = "paused";
        });
    });

    marQuee.addEventListener("mouseleave", () => {
        marQuee.querySelectorAll("li").forEach((li) => {
            li.style.animationPlayState = "running";
        });
    });
}

// cursor ball
const ball = document.querySelector(".cursor-ball");
const ballSize = ball.offsetWidth;

if (ball) {
    document.addEventListener("mousemove", (e) => {
        const { clientX: x, clientY: y } = e;
        ball.style.transform = `translate(${x - ballSize / 2}px, ${y - ballSize / 2}px)`;
    });
}
