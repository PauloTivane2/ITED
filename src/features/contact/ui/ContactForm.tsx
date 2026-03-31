import { motion } from 'framer-motion';
import { useContact } from '../model/useContact';
import { FiUser, FiMail, FiMessageSquare, FiSend, FiCheckCircle, FiXCircle, FiInfo } from 'react-icons/fi';

export const ContactForm = () => {
  const { formData, status, errorMessage, handleChange, handleSubmit } = useContact();

  const isSubmitting = status === 'loading';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-white/5 backdrop-blur-lg border border-black/5 dark:border-white/10 rounded-2xl p-8 shadow-2xl w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900/50"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Envie uma Mensagem</h2>
        <p className="text-gray-600 dark:text-gray-400">Preencha o formulário abaixo e entraremos em contacto consigo o mais breve possível.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <div className="relative group">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome Completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <FiUser />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-zinc-700 rounded-xl bg-gray-50/50 dark:bg-zinc-800/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                placeholder="Ex: João Silva"
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <FiMail />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-zinc-700 rounded-xl bg-gray-50/50 dark:bg-zinc-800/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                placeholder="Ex: joao@email.com"
              />
            </div>
          </div>
        </div>

        {/* Assunto */}
        <div className="relative group">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Assunto
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <FiInfo />
            </div>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              disabled={isSubmitting}
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-zinc-700 rounded-xl bg-gray-50/50 dark:bg-zinc-800/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
              placeholder="Ex: Pedido de Oração"
            />
          </div>
        </div>

        {/* Mensagem */}
        <div className="relative group">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Mensagem
          </label>
          <div className="relative">
            <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <FiMessageSquare />
            </div>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-zinc-700 rounded-xl bg-gray-50/50 dark:bg-zinc-800/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
              placeholder="Escreva a sua mensagem aqui..."
            ></textarea>
          </div>
        </div>

        {/* Status Alerts */}
        {isError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex items-center gap-3 p-4 text-red-700 bg-red-50 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/50 rounded-xl"
          >
            <FiXCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{errorMessage}</p>
          </motion.div>
        )}

        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex items-center gap-3 p-4 text-teal-700 bg-teal-50 border border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800/50 rounded-xl"
          >
            <FiCheckCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">A sua mensagem foi enviada com sucesso! Entraremos em contacto brevemente.</p>
          </motion.div>
        )}

        {/* Botão de Envio */}
        <motion.button
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          type="submit"
          disabled={isSubmitting || isSuccess}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-white font-semibold transition-all shadow-lg ${
            isSuccess
              ? 'bg-teal-500 shadow-teal-500/25 cursor-default'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/40'
          } ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0     12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              A Enviar Mensagem...
            </div>
          ) : isSuccess ? (
            <>
              <FiCheckCircle className="w-5 h-5" />
              Mensagem Enviada
            </>
          ) : (
            <>
              <FiSend className="w-5 h-5" />
              Enviar Mensagem
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};