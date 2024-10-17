export type SingleOrArray<T> = T | T[];

type StringKeyOf<T> = keyof T & string;

export type KeysOfType<T extends object, V> = StringKeyOf<{ [K in keyof T as T[K] extends V ? K : never]: true }>;