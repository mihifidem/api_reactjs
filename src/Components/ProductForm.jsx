import { useState } from "react";
import "./ProductForm.css";

export default function ProductForm({
  onSubmit,
  onCancel,
  saving,
  initialValues,
  title = "Agregar producto",
  submitLabel = "Guardar",
}) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [price, setPrice] = useState(initialValues?.price ?? "");
  const [stock, setStock] = useState(initialValues?.stock ?? "0");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (!name.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      setError("El precio debe ser un número mayor a 0.");
      return;
    }

    if (Number.isNaN(parsedStock) || parsedStock < 0) {
      setError("El stock debe ser un número igual o mayor a 0.");
      return;
    }

    try {
      await onSubmit({
        name: name.trim(),
        price: parsedPrice,
        stock: parsedStock,
      });

      setName("");
      setPrice("");
      setStock("0");
    } catch (submitError) {
      setError(submitError.message || "No se pudo guardar el producto.");
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h3 className="product-form__title">{title}</h3>

      <div className="product-form__grid">
        <label className="product-form__field">
          Nombre
          <input
            className="product-form__input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nombre del producto"
          />
        </label>

        <label className="product-form__field">
          Precio
          <input
            className="product-form__input"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="0.00"
          />
        </label>

        <label className="product-form__field">
          Stock
          <input
            className="product-form__input"
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            placeholder="0"
          />
        </label>
      </div>

      <div className="product-form__actions">
        <button
          type="submit"
          className="product-form__button product-form__button--save"
          disabled={saving}
        >
          {saving ? "Guardando..." : submitLabel}
        </button>

        <button
          type="button"
          className="product-form__button product-form__button--cancel"
          onClick={onCancel}
          disabled={saving}
        >
          Cancelar
        </button>
      </div>

      {error && <p className="product-form__error">{error}</p>}
    </form>
  );
}