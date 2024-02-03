import { component, html, useEffect, useState } from "haunted";
import { useAppContext } from "../contexts/AppContext";

const toasterStyles = `
:host {
  display: block;
  position: absolute;
  z-index: 1;
  bottom: 40px;
  left: 0;
  width: 100%;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
}

@media print {
  :host {
    display: none;
  }
}
`;

const Toaster = () => {
  const { state } = useAppContext();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    console.log(state.toaster, "state.toaster");
    setMessage(state.toaster);
  }, [state]);

  return html`
    <style>
      ${toasterStyles}
    </style>
    <p>${message}</p>
  `;
};

customElements.define(
  "status-toaster",
  component(Toaster, { useShadowDOM: true })
);
