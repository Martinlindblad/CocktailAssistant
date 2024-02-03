import { component, html } from "haunted";

interface ModalProps {
  isOpen: boolean;
  items: string[];
}
const Modal = ({ isOpen, items }: ModalProps) => {
  return html`
    <style>
      .modal-overlay {
        display: ${isOpen ? "flex" : "none"};
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
        z-index: 0;
      }
      .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 4px;
      }
      .close-button {
        float: right;
        cursor: pointer;
      }
    </style>
    <div class="modal-overlay">
      <div class="modal-content">
        <h2>Shopping List Items</h2>
        <ul>
          ${items.map((item) => html`<li>${item}</li>`)}
        </ul>
      </div>
    </div>
  `;
};

customElements.define("modal-component", component(Modal));
