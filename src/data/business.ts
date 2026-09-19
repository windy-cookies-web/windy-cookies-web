// Datos del negocio. Todo lo editable a mano vive acá.

export const business = {
  name: "Windy Pastelería",
  slogan: "Se anuncian con su aroma",
  city: "Santiago",
  country: "Chile",
  // WhatsApp en formato internacional sin signos, para los links wa.me
  whatsapp: "56944918213",
  whatsappDisplay: "+56 9 4491 8213",
  // Horario de corte supuesto para pedidos del día siguiente. Cambiar acá si se define otro.
  cutoff: "18:00",
  leadTime: "24 h",
};

// Mensajes rotativos de la barra superior.
export const tickerMessages = [
  "Horneadas bajo pedido, nunca de bodega",
  `Pide antes de las ${business.cutoff}`,
  "Coordinamos todo por WhatsApp",
];

// Datos de transferencia. Los campos marcados PENDIENTE hay que completarlos
// cuando estén definidos: se muestran tal cual en el sitio y en el mensaje de WhatsApp.
export const bankAccount = {
  bank: "Banco Estado",
  type: "Cuenta RUT",
  holder: "PENDIENTE — nombre del titular",
  rut: "PENDIENTE — RUT del titular",
  accountNumber: "PENDIENTE — número de Cuenta RUT",
  email: "PENDIENTE — email del titular",
};

export const deliveryOptions = [
  {
    title: "Retiro personal",
    price: "Gratis",
    description:
      "Nos pones de acuerdo por WhatsApp, pasas a la hora coordinada y te las llevas recién horneadas.",
  },
  {
    title: "Despacho propio",
    price: "A coordinar",
    description:
      "Cuando hay disponibilidad lo llevamos nosotros. El valor depende de la comuna y lo confirmamos antes de que transfieras.",
  },
  {
    title: "Rappi o Uber",
    price: "Lo paga el cliente",
    description:
      "Pides el delivery tú y lo pagas directo a la app. No fijamos un precio porque no es nuestro: lo revisamos juntos por WhatsApp según tu dirección.",
  },
];

export const steps = [
  {
    number: "01",
    title: "Escoge tus productos",
    description:
      "Elige las piezas y las cantidades que quieras. No hay mínimo de compra: si es una sola galleta, horneamos esa tanda igual.",
  },
  {
    number: "02",
    title: "Transfiere y confirma",
    description:
      "El botón abre WhatsApp con tu pedido, el total y los datos bancarios ya escritos. Transfieres y envías el comprobante en el mismo chat.",
  },
  {
    number: "03",
    title: "Horneamos y entregamos",
    description:
      `Por ahora trabajamos con ${business.leadTime} de anticipación. Vamos con miras a tener algunos productos listos al momento.`,
  },
];
