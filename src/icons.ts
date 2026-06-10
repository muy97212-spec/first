/* FIRST — iconography. Lucide, thin 2px-stroke outline, currentColor, 24px
 * grid. Canonical assignments from the design system's ICONOGRAPHY section.
 * Members are lowercase so screens read like the design prototype: <Icon.zap/>.
 */
import {
  Aperture,
  BookOpen,
  User,
  Zap,
  SwitchCamera,
  Sparkles,
  X,
  Bookmark,
  Check,
  RotateCcw,
  Share,
  MapPin,
  Calendar,
  Clock,
  Thermometer,
  Sun,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
} from 'lucide-react-native';

export const Icon = {
  aperture: Aperture, // capture tab
  bookOpen: BookOpen, // archive tab / "make book"
  user: User, // you tab
  zap: Zap, // flash
  flip: SwitchCamera, // flip camera
  sparkles: Sparkles, // the system speaking
  x: X, // close
  bookmark: Bookmark, // save
  check: Check, // saved
  replay: RotateCcw, // replay memory
  share: Share, // share
  mapPin: MapPin, // place
  calendar: Calendar, // date
  clock: Clock, // time
  thermometer: Thermometer, // weather
  sun: Sun,
  arrowLeft: ArrowLeft, // back
  arrowRight: ArrowRight,
  chevronRight: ChevronRight,
};
