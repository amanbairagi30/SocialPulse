import "./css/theme-switch.css";

const ThemeSwitch = () => {
  return (
    <label className="m-4">
      <input className="slider" type="checkbox" />
      <div className="switch">
        <div className="suns"></div>
        <div className="moons">
          <div className="star star-1"></div>
          <div className="star star-2"></div>
          <div className="star star-3"></div>
          <div className="star star-4"></div>
          <div className="star star-5"></div>
          <div className="first-moon"></div>
        </div>
        <div className="sand"></div>
        <div className="bb8">
          <div className="antennas">
            <div className="antenna short"></div>
            <div className="antenna long"></div>
          </div>
          <div className="head">
            <div className="stripe one"></div>
            <div className="stripe two"></div>
            <div className="eyes">
              <div className="eye one"></div>
              <div className="eye two"></div>
            </div>
            <div className="stripe detail">
              <div className="detail zero"></div>
              <div className="detail zero"></div>
              <div className="detail one"></div>
              <div className="detail two"></div>
              <div className="detail three"></div>
              <div className="detail four"></div>
              <div className="detail five"></div>
              <div className="detail five"></div>
            </div>
            <div className="stripe three"></div>
          </div>
          <div className="ball">
            <div className="lines one"></div>
            <div className="lines two"></div>
            <div className="ring one"></div>
            <div className="ring two"></div>
            <div className="ring three"></div>
          </div>
          <div className="shadow"></div>
        </div>
      </div>
    </label>
  );
};

export default ThemeSwitch;
