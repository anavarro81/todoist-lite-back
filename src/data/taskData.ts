const taskData = [
  {
    name: "Revisar documentación del proyecto",
    description: "Actualizar la documentación técnica",
    created: new Date("2026-02-02"),
    priority: "priority 1",
    dueTime: new Date("2026-01-30T10:00:00"), // Anterior a hoy
    repeat: { repeatType: "none" },
    user: "697cd1cd72f692db770ffc6e",
    project: "697cd1ce72f692db770ffc71",
  },
  {
    name: "Reunión con el equipo",
    description: "Planificar sprint",
    created: new Date("2026-02-02"),
    priority: "priority 2",
    dueTime: new Date("2026-02-02T09:00:00"), // Hoy
    repeat: { repeatType: "none" },
    user: "697cd1cd72f692db770ffc6e",
    project: "697cd1ce72f692db770ffc71",
  },
  {
    name: "Implementar autenticación",
    description: "JWT y OAuth2",
    created: new Date("2026-02-02"),
    priority: "priority 1",
    dueTime: new Date("2026-02-02T15:30:00"), // Hoy
    repeat: { repeatType: "none" },
    user: "697cd1cd72f692db770ffc6e",
    project: "697cd1ce72f692db770ffc71",
  },
  {
    name: "Corregir bugs reportados",
    description: "Resolver issues prioritarios",
    created: new Date("2026-02-02"),
    priority: "priority 3",
    dueTime: new Date("2026-01-31T18:00:00"), // Anterior a hoy
    repeat: { repeatType: "none" },
    user: "697cd1cd72f692db770ffc6e",
    project: "697cd1ce72f692db770ffc71",
  },
  {
    name: "Diseñar base de datos",
    description: "Esquema MongoDB",
    created: new Date("2026-02-02"),
    priority: "priority 2",
    dueTime: new Date("2026-02-02T11:00:00"), // Hoy
    repeat: { repeatType: "none" },
    user: "697cd1cd72f692db770ffc6e",
    project: "697cd1ce72f692db770ffc71",
  },
  {
    name: "Preparar presentación",
    description: "Demo para cliente",
    created: new Date("2026-02-02"),
    priority: "priority 1",
    dueTime: new Date("2026-02-05T14:00:00"), // Futura
    repeat: { repeatType: "none" },
    user: "697cd1cd72f692db770ffc6e",
    project: "697cd1ce72f692db770ffc71",
  },
  {
    name: "Realizar testing",
    description: "Pruebas unitarias e integración",
    created: new Date("2026-02-02"),
    priority: "priority 2",
    dueTime: new Date("2026-02-02T17:00:00"), // Hoy
    repeat: { repeatType: "none" },
    user: "697cd1cd72f692db770ffc6e",
    project: "697cd1ce72f692db770ffc71",
  },
  {
    name: "Optimizar rendimiento",
    description: "Mejorar queries y caché",
    created: new Date("2026-02-02"),
    priority: "priority 3",
    dueTime: new Date("2026-02-04T16:00:00"), // Futura
    repeat: { repeatType: "none" },
    user: "697cd1cd72f692db770ffc6e",
    project: "697cd1ce72f692db770ffc71",
  },
  {
    name: "Actualizar dependencias",
    description: "npm packages",
    created: new Date("2026-02-02"),
    priority: "priority 4",
    dueTime: new Date("2026-02-06T10:00:00"), // Futura
    repeat: { repeatType: "none" },
    user: "697cd1cd72f692db770ffc6e",
    project: "697cd1ce72f692db770ffc71",
  },
  {
    name: "Configurar CI/CD",
    description: "Pipeline de deployment",
    created: new Date("2026-02-02"),
    priority: "priority 4",
    dueTime: new Date("2026-02-08T12:00:00"), // Futura
    repeat: { repeatType: "none" },
    user: "697cd1cd72f692db770ffc6e",
    project: "697cd1ce72f692db770ffc71",
  },
];

export default taskData;
