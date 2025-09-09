export const Footer = () => {
  return (
    <footer className="py-16 px-4 md:px-6 bg-black-grainy relative overflow-hidden border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/111b5d7c-af39-4666-865d-874b4c80c29d.png" 
              alt="Elevate Properties" 
              className="h-24 w-auto filter invert opacity-60"
            />
          </div>
          
          {/* Copyright */}
          <div className="text-center">
            <p className="text-white/40 text-sm">
              © 2024 Elevate Properties. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};