import { Github, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-red-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm font-geist mb-4 md:mb-0">
            © 2025 Spark Chat. Real-time messaging reimagined.
          </p>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com" 
              className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors text-sm font-geist"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
            <a href="mailto:farrellelijah@outlook.com" className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors text-sm font-geist">
              <Mail size={16} />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
