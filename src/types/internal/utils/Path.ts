type Join<K, P> = K extends string | number ? (P extends string | number ? `${K}.${P}` : never) : never

// Adds typechecking for object paths:
export type Path<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Path<T[K]>> : never
    }[keyof T]
  : ''
