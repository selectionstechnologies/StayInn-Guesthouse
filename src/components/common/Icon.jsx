import {
  BadgeDollarSign, Car, Cctv, CigaretteOff, Coffee, ConciergeBell, Croissant, Facebook, HeartHandshake,
  IdCard, Instagram, Laptop, Lock, LogIn, LogOut, MapPin, Moon, PawPrint, Plane, Refrigerator, ShieldCheck,
  Shirt, ShowerHead, Snowflake, Sofa, Sparkles, Sun, Trees, Tv, Twitter, UtensilsCrossed, WashingMachine,
  Wifi, Youtube, Circle,
} from 'lucide-react';

/** Maps icon names stored in /data to lucide components, keeping data backend-friendly. */
const icons = {
  BadgeDollarSign, Car, Cctv, CigaretteOff, Coffee, ConciergeBell, Croissant, Facebook, HeartHandshake,
  IdCard, Instagram, Laptop, Lock, LogIn, LogOut, MapPin, Moon, PawPrint, Plane, Refrigerator, ShieldCheck,
  Shirt, ShowerHead, Snowflake, Sofa, Sparkles, Sun, Trees, Tv, Twitter, UtensilsCrossed, WashingMachine,
  Wifi, Youtube,
};

export default function Icon({ name, ...props }) {
  const Component = icons[name] || Circle;
  return <Component aria-hidden="true" {...props} />;
}
