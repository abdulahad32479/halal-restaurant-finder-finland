interface NearMeButtonProps {
  onLocate: (lat: number, lng: number) => void;
  loading: boolean;
}

export default function NearMeButton({ onLocate, loading }: NearMeButtonProps) {
  function handleClick() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onLocate(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Could not get your location. Please check your browser permissions.");
      },
      { timeout: 10000 }
    );
  }

  return (
    <button
      className={`near-me-btn ${loading ? "near-me-btn--loading" : ""}`}
      onClick={handleClick}
      disabled={loading}
      aria-label="Find restaurants near me"
      style={{ fontWeight: 900 }}
    >
      <span className="near-me-btn__icon">✈</span>
      <span>Near Me</span>
    </button>
  );
}
