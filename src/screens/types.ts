/* FIRST — navigation contract shared by the five screens. */
import type { Memory } from '../data';

export type ViewName = 'camera' | 'result' | 'archive' | 'detail' | 'you';

/** Navigate, optionally carrying the memory the next screen should render. */
export type Go = (next: ViewName, payload?: Memory) => void;

/** A freshly captured memory may use a local photo URI for its image. */
export type CapturedMemory = Memory;
