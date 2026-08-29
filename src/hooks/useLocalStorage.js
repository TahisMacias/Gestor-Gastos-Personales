import { useState, useEffect } from "react";

// Hook personalizado que sincroniza un estado de React con LocalStorage.
// Se usa exactamente igual que useState, pero además:
//  1. Al montarse, intenta recuperar el valor guardado en el navegador.
//  2. Cada vez que el estado cambia, lo vuelve a guardar automáticamente.
export function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = window.localStorage.getItem(clave);
      return guardado ? JSON.parse(guardado) : valorInicial;
    } catch (error) {
      console.error("Error al leer LocalStorage:", error);
      return valorInicial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(clave, JSON.stringify(valor));
    } catch (error) {
      console.error("Error al guardar en LocalStorage:", error);
    }
  }, [clave, valor]);

  return [valor, setValor];
}
