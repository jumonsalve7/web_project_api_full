// import React, { useEffect } from "react";
// import close from "../../assets/images/close.png";
// import successIcon from "../../assets/images/successIcon.png.png"; // Ajusta la ruta
// import errorIcon from "../../assets/images/errorIcon.png.png"; // Ajusta la ruta
// import "../../../blocks/InfoTooltip.css"; // ¡No olvides importar el nuevo CSS!

// export default function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
//   return (
//     <section
//       className={`popup-tooltip ${isOpen ? "popup-tooltip_opened" : ""}`}
//       onClick={onClose}
//     >
//       <div
//         className="infotooltip__container"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button type="button" className="infotooltip__close" onClick={onClose}>
//           <img src={close} alt="Cerrar" />
//         </button>

//         <img
//           src={isSuccess ? successIcon : errorIcon}
//           alt="Icono de estado"
//           className="infotooltip__icon"
//         />

//         <h3 className="infotooltip__message">
//           {isSuccess
//             ? "¡Amazing! You are now registered."
//             : message || "Ups... Something went wrong. Please try again."}
//         </h3>
//       </div>
//     </section>
//   );
// }
import React, { useEffect } from "react";
import close from "../../assets/images/close.png";
import successIcon from "../../assets/images/successIcon.png.png"; // Ajusta la ruta
import errorIcon from "../../assets/images/errorIcon.png.png"; // Ajusta la ruta
import "../../../blocks/InfoTooltip.css"; 

export default function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  return (
    /* Aquí usamos 'infotooltip' y 'infotooltip_opened' como en tu CSS */
    <section
      className={`infotooltip ${isOpen ? "infotooltip_opened" : ""}`}
      onClick={onClose}
    >
      {/* El stopPropagation evita que se cierre al hacer clic dentro del cuadro blanco */}
      <div
        className="infotooltip__container"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="infotooltip__close" onClick={onClose}>
          <img src={close} alt="Cerrar" />
        </button>

        <img
          src={isSuccess ? successIcon : errorIcon}
          alt="Icono de estado"
          className="infotooltip__icon"
        />

        <h3 className="infotooltip__message">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : message || "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </h3>
      </div>
    </section>
  );
}
