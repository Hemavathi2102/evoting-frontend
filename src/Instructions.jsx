import instructionImg from "./instruction.png";

function Instructions() {
  return (
    <div className="instructions-container">
      <h2 className="instructions-title">
        📦 E-Voting System Instructions Overview
      </h2>

      <img
        src={instructionImg}
        alt="E-Voting Instructions"
        className="instruction-image"
      />
    </div>
  );
}

export default Instructions;