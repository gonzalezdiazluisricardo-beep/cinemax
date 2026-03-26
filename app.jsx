import { useState, useEffect, useRef } from "react";

const movies = [
  {
    id: 1, title: "Dune: Part Two", year: 2024, rating: 8.7, genre: ["Sci-Fi", "Aventura"],
    duration: "2h 46m", description: "Paul Atreides se une a los Fremen y comienza un viaje espiritual y marcial para convertirse en Muad'Dib, mientras intenta evitar el terrible futuro que solo él puede prever.",
    hero: true, badge: "TOP 10",
    gradient: "linear-gradient(135deg, #c9a84c 0%, #8b5e3c 50%, #1a0a00 100%)",
    accent: "#c9a84c",
  },
  {
    id: 2, title: "Oppenheimer", year: 2023, rating: 8.9, genre: ["Drama", "Historia"],
    duration: "3h", description: "La historia del físico americano J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica durante la Segunda Guerra Mundial.",
    hero: false, badge: "Premio Oscar",
    gradient: "linear-gradient(135deg, #ff6a00 0%, #c0392b 50%, #0a0000 100%)",
    accent: "#ff6a00",
  },
  {
    id: 3, title: "Poor Things", year: 2023, rating: 8.3, genre: ["Fantasía", "Comedia"],
    duration: "2h 21m", description: "Una joven resucitada por un científico excéntrico huye con un abogado libertino y comienza un viaje de autodescubrimiento.",
    hero: false, badge: "Nuevo",
    gradient: "linear-gradient(135deg, #a8edea 0%, #6c5ce7 50%, #000428 100%)",
    accent: "#a8edea",
  },
  {
    id: 4, title: "Killers of the Flower Moon", year: 2023, rating: 7.7, genre: ["Drama", "Crimen"],
    duration: "3h 26m", description: "Miembros de la nación Osage son asesinados misteriosamente en la década de 1920 tras el descubrimiento de petróleo en sus tierras.",
    hero: false, badge: "Épica",
    gradient: "linear-gradient(135deg, #f7971e 0%, #874000 50%, #0d0000 100%)",
    accent: "#f7971e",
  },
  {
    id: 5, title: "The Zone of Interest", year: 2023, rating: 7.9, genre: ["Drama", "Historia"],
    duration: "1h 45m", description: "El comandante de Auschwitz y su esposa construyen su vida de ensueño junto a los muros del campo.",
    hero: false, badge: "Aclamada",
    gradient: "linear-gradient(135deg, #636e72 0%, #2d3436 50%, #000000 100%)",
    accent: "#b2bec3",
  },
  {
    id: 6, title: "Past Lives", year: 2023, rating: 7.9, genre: ["Romance", "Drama"],
    duration: "1h 46m", description: "Dos amigos de infancia se reencuentran en Nueva York décadas después, confrontando los caminos que sus vidas tomaron.",
    hero: false, badge: "Emotiva",
    gradient: "linear-gradient(135deg, #fd79a8 0%, #6c5ce7 50%, #000428 100%)",
    accent: "#fd79a8",
  },
  {
    id: 7, title: "Saltburn", year: 2023, rating: 7.1, genre: ["Thriller", "Drama"],
    duration: "2h 11m", description: "Un estudiante de Oxford obsesionado con su carismático compañero lo visita en la extravagante mansión de su familia durante el verano.",
    hero: false, badge: "Oscura",
    gradient: "linear-gradient(135deg, #2d6a4f 0%, #1b4332 50%, #000a06 100%)",
    accent: "#52b788",
  },
  {
    id: 8, title: "Priscilla", year: 2023, rating: 6.8, genre: ["Biográfica", "Drama"],
    duration: "1h 53m", description: "Vista desde los ojos de Priscilla Presley, la historia de su relación con Elvis Presley desde su primer encuentro.",
    hero: false, badge: "Íntima",
    gradient: "linear-gradient(135deg, #f8b195 0%, #c06c84 50%, #1a0010 100%)",
    accent: "#f8b195",
  },
];

const categories = [
  { label: "Inicio", icon: "⌂" },
  { label: "Series", icon: "◫" },
  { label: "Películas", icon: "▶" },
  { label: "Novedades", icon: "✦" },
  { label: "Mi Lista", icon: "+" },
];

const StarRating = ({ rating }) => {
  const stars = Math.round(rating / 2);
  return (
    <span style={{ color: "#00b4fc", letterSpacing: 1 }}>
      {"★".repeat(stars)}{"☆".repeat(5 - stars)}
      <span style={{ color: "#aaa", marginLeft: 6, fontSize: 12 }}>{rating}/10</span>
    </span>
  );
};

const Badge = ({ text, accent }) => (
  <span style={{
    background: accent || "#00b4fc",
    color: "#fff",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 2,
    padding: "3px 10px",
    borderRadius: 3,
    textTransform: "uppercase",
    boxShadow: `0 0 12px ${accent || "#00b4fc"}88`,
  }}>{text}</span>
);

const MovieCard = ({ movie, onSelect, isLarge }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onSelect(movie)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: `0 0 ${isLarge ? "260px" : "190px"}`,
        height: isLarge ? "155px" : "110px",
        borderRadius: 6,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        background: movie.gradient,
        transition: "transform 0.3s cubic-bezier(.4,2,.55,.9), box-shadow 0.3s",
        transform: hovered ? "scale(1.13) translateY(-6px)" : "scale(1)",
        boxShadow: hovered ? `0 12px 40px ${movie.accent}66, 0 0 0 2px ${movie.accent}` : "0 4px 16px #0008",
        zIndex: hovered ? 10 : 1,
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, #000c 50%, transparent 100%)",
      }} />
      <div style={{ position: "absolute", bottom: 10, left: 12, right: 12 }}>
        <div style={{ fontSize: isLarge ? 14 : 12, fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display', serif", lineHeight: 1.2 }}>
          {movie.title}
        </div>
        {hovered && (
          <div style={{ fontSize: 10, color: "#00b4fc", fontWeight: 700, marginTop: 3, letterSpacing: 1 }}>
            {movie.genre.join(" · ")}
          </div>
        )}
      </div>
      {movie.badge && (
        <div style={{ position: "absolute", top: 8, left: 10 }}>
          <Badge text={movie.badge} accent={movie.accent} />
        </div>
      )}
      <div style={{
        position: "absolute", inset: 0,
        background: movie.gradient,
        opacity: 0.6,
        mixBlendMode: "multiply",
      }} />
    </div>
  );
};

const Modal = ({ movie, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "#000b",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, backdropFilter: "blur(6px)",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(90vw, 720px)",
          background: "#141414",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: `0 0 80px ${movie.accent}44, 0 30px 80px #000c`,
          animation: "slideUp 0.3s cubic-bezier(.4,2,.55,.9)",
          border: `1px solid ${movie.accent}33`,
        }}
      >
        <div style={{
          height: 280, background: movie.gradient,
          position: "relative", display: "flex", alignItems: "flex-end",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, #141414 0%, transparent 60%)",
          }} />
          <div style={{ position: "relative", padding: "28px 32px", zIndex: 1 }}>
            <Badge text={movie.badge} accent={movie.accent} />
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 36, fontWeight: 900, color: "#fff",
              margin: "10px 0 4px", lineHeight: 1.1,
            }}>{movie.title}</h1>
            <div style={{ color: movie.accent, fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
              {movie.genre.join(" · ")}
            </div>
          </div>
        </div>
        <div style={{ padding: "24px 32px 32px" }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center", marginBottom: 18 }}>
            <StarRating rating={movie.rating} />
            <span style={{ color: "#888", fontSize: 13 }}>{movie.year}</span>
            <span style={{ color: "#888", fontSize: 13 }}>⏱ {movie.duration}</span>
          </div>
          <p style={{ color: "#ccc", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
            {movie.description}
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{
              background: "#fff", color: "#000",
              border: "none", borderRadius: 5, padding: "12px 28px",
              fontWeight: 800, fontSize: 15, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
            }}>▶ Reproducir</button>
            <button style={{
              background: "#333", color: "#fff",
              border: "none", borderRadius: 5, padding: "12px 28px",
              fontWeight: 700, fontSize: 15, cursor: "pointer",
            }}>＋ Mi Lista</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Row = ({ title, movies, onSelect, isLarge }) => {
  const rowRef = useRef(null);
  const scroll = (dir) => {
    if (rowRef.current) rowRef.current.scrollBy({ left: dir * 400, behavior: "smooth" });
  };
  return (
    <div style={{ marginBottom: 40, position: "relative" }}>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 20, fontWeight: 700, color: "#e5e5e5",
        marginBottom: 14, paddingLeft: 48, letterSpacing: 0.5,
      }}>{title}</h2>
      <div style={{ position: "relative" }}>
        <button onClick={() => scroll(-1)} style={arrowBtn("left")}>‹</button>
        <div ref={rowRef} style={{
          display: "flex", gap: 10, overflowX: "auto",
          scrollbarWidth: "none", padding: "10px 48px",
        }}>
          {movies.map(m => (
            <MovieCard key={m.id} movie={m} onSelect={onSelect} isLarge={isLarge} />
          ))}
        </div>
        <button onClick={() => scroll(1)} style={arrowBtn("right")}>›</button>
      </div>
    </div>
  );
};

const arrowBtn = (side) => ({
  position: "absolute", [side]: 0, top: "50%", transform: "translateY(-50%)",
  background: "linear-gradient(to " + (side === "left" ? "right" : "left") + ", #000e, transparent)",
  border: "none", color: "#fff", fontSize: 40, cursor: "pointer",
  height: "100%", width: 50, zIndex: 5, display: "flex", alignItems: "center",
  justifyContent: "center", opacity: 0.8,
});

export default function NetflixApp() {
  const [selected, setSelected] = useState(null);
  const [activeNav, setActiveNav] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const hero = movies[heroIdx];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setHeroIdx(i => (i + 1) % 3), 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      background: "#0a0a0a", minHeight: "100vh", color: "#fff",
      fontFamily: "'DM Sans', sans-serif", overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { transform:translateY(40px);opacity:0 } to { transform:translateY(0);opacity:1 } }
        @keyframes heroIn { from { opacity:0;transform:translateX(-30px) } to { opacity:1;transform:translateX(0) } }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 48px",
        background: scrolled ? "linear-gradient(to bottom, #000e 100%, transparent)" : "linear-gradient(to bottom, #000c 60%, transparent)",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background 0.4s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: "#00b4fc", letterSpacing: -1 }}>CINEMAX</div>
          <div style={{ display: "flex", gap: 4 }}>
            {categories.map((c, i) => (
              <button key={i} onClick={() => setActiveNav(i)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: activeNav === i ? "#fff" : "#aaa",
                fontSize: 13, fontWeight: activeNav === i ? 700 : 500,
                padding: "8px 14px", borderRadius: 6,
                borderBottom: activeNav === i ? "2px solid #00b4fc" : "2px solid transparent",
                transition: "color 0.2s",
              }}>{c.label}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button style={navIconBtn}>🔍</button>
          <button style={navIconBtn}>🔔</button>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg, #00b4fc, #0077cc)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 800, cursor: "pointer",
          }}>U</div>
        </div>
      </nav>

      <div style={{ height: "90vh", position: "relative", overflow: "hidden", background: hero.gradient }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, #0a0a0a 0%, #0a0a0a55 40%, transparent 70%), linear-gradient(to top, #0a0a0a 0%, transparent 40%)",
        }} />
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 5 }}>
          {[0, 1, 2].map(i => (
            <button key={i} onClick={() => setHeroIdx(i)} style={{
              width: heroIdx === i ? 28 : 8, height: 8,
              borderRadius: 4, border: "none", cursor: "pointer",
              background: heroIdx === i ? "#00b4fc" : "#ffffff55",
              transition: "all 0.3s",
            }} />
          ))}
        </div>
        <div key={hero.id} style={{
          position: "absolute", bottom: "18%", left: 48, maxWidth: 560,
          animation: "heroIn 0.7s ease forwards",
        }}>
          <Badge text={hero.badge} accent={hero.accent} />
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 62, fontWeight: 900, lineHeight: 1.05,
            margin: "16px 0 14px", color: "#fff",
            textShadow: "0 4px 30px #0008",
          }}>{hero.title}</h1>
          <div style={{ color: hero.accent, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 14, textTransform: "uppercase" }}>
            {hero.genre.join(" · ")} · {hero.year} · {hero.duration}
          </div>
          <p style={{ color: "#ccc", fontSize: 15, lineHeight: 1.7, marginBottom: 28, maxWidth: 440 }}>
            {hero.description}
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <button onClick={() => setSelected(hero)} style={{
              background: "#fff", color: "#000", border: "none", borderRadius: 6,
              padding: "14px 34px", fontWeight: 800, fontSize: 16, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 10,
            }}>▶ Reproducir</button>
            <button onClick={() => setSelected(hero)} style={{
              background: "#ffffff22", color: "#fff",
              border: "1px solid #ffffff44", borderRadius: 6, padding: "14px 28px",
              fontWeight: 700, fontSize: 15, cursor: "pointer",
            }}>ⓘ Más info</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: -60, position: "relative", zIndex: 2, paddingBottom: 60 }}>
        <Row title="🔥 Tendencias ahora" movies={movies} onSelect={setSelected} isLarge />
        <Row title="🎬 Dramas premiados" movies={[...movies].reverse()} onSelect={setSelected} />
        <Row title="✨ Novedades de la semana" movies={movies.slice(2)} onSelect={setSelected} />
        <Row title="🌙 Películas oscuras e intensas" movies={movies.slice(0, 5)} onSelect={setSelected} isLarge />
      </div>

      <footer style={{
        background: "#0a0a0a", borderTop: "1px solid #1a1a1a",
        padding: "32px 48px", color: "#555", fontSize: 12,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", color: "#00b4fc", fontSize: 20, fontWeight: 900 }}>CINEMAX</div>
        <div>© 2024 CineMax. Todos los derechos reservados.</div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacidad", "Términos", "Contacto"].map(t => (
            <span key={t} style={{ cursor: "pointer" }}>{t}</span>
          ))}
        </div>
      </footer>

      {selected && <Modal movie={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

const navIconBtn = {
  background: "none", border: "none", cursor: "pointer",
  color: "#fff", fontSize: 18, padding: "6px 8px", borderRadius: 6,
};
