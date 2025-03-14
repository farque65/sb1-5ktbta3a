import { Terminal, Twitter } from "lucide-react";

export default function Footer() {

return (
    <footer className="bg-background text-black py-8 mt-4">
        <div className="text-center text-gray-400">
          <a href="https://amrakori.com" target="_blank" className="bg-blue-400 text-white bg-secondary border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded-full text-lg font-medium">
            Made with ❤️ by Amrakori
          </a>
        </div>
    </footer>
    );
}