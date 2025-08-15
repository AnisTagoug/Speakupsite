import { useState } from 'react';

export default function TeamSection({ t }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const members = [
    {
      nickname: 'SoPraNo_DoN',
      avatar: '/src/assets/avatars/soprano.jpg',
      role: 'CEO',
      hierarchy: 1,
      description: '🎙️ SoPraNo_DoN\nLocutor Gringo é o fundador da Rádio SPEAK UP no Club Cooee. Com experiência em diversos tipos de locuções — como freestyle, cerimônias de casamento, aniversários e competições — ele traz carisma e presença marcante a cada transmissão.\n\n🎧 Estilo musical:\nInternacional, funk, músicas animadas, canções românticas e muito mais. A vibe certa para cada momento!'
    },
    {
      nickname: 'ADRIANO200013',
      avatar: '/src/assets/avatars/Adriano.jpg',
      role: 'CEO',
      hierarchy: 1,
      description: 
        '🎤 Adriano é um showman completo, dominando todos os temas de locução com muita energia e carisma. Seja como padre em casamentos ou animador de festas, ele garante uma animação contagiante que envolve todos os presentes.\n\n' +
        '🎶 Estilo musical:\nFunk, pagode, piseiro e músicas que trazem uma vibe animada, perfeita para levantar o astral e fazer todo mundo dançar.'
    },
    
    {
      nickname: '___Livia___',
      avatar: '/src/assets/avatars/livia.jpg',
      role: 'Chef Design',
      hierarchy: 2,
      description: '🎨 Lívia – A Chef do Design e das Redes\nLívia é a designer oficial da Rádio SPEAK UP e responsável pelo visual encantador do nosso Instagram oficial.\nCom domínio profissional de ferramentas como Canva Pro e o app de edição CapCut, ela transforma cada festa em uma experiência visual inesquecível!\n\n✨ Habilidades:\n\n• Cria convites personalizados para cada evento\n\n• Realiza gravações profissionais das festas com efeitos visuais incríveis\n\n• Cuida das redes sociais com carinho e dedicação\n\nLívia é a artista por trás da nossa identidade visual!'
    },
    {
      nickname: 'RafaelaPacker',
      avatar: '/src/assets/avatars/rafa.jpg',
      role: 'Coord Eventos',
      hierarchy: 3,
      description: '🎉 RafaelaPacker – Coordenadora de Eventos da Rádio\nRAFAELA é a coordenadora de eventos da Rádio SPEAK UP, responsável por organizar as festas que a rádio anima dentro do Club Cooee.\nEla gerencia tudo com excelência: desde o contato com patrocinadores, até o alinhamento com o staff da rádio para garantir que cada evento seja inesquecível.\n\n💡 Como ela ajuda:\n\n• Criação da ideia e conceito da festa\n\n• Fazendo convites para os eventos\n\nCom Rafaela, sua festa está em boas mãos! 🎈'
    },
    {
      nickname: 'Rosiane_roh',
      avatar: '/src/assets/avatars/Rosi.jpg',
      role: 'Coord Eventos',
      hierarchy: 3,
      description: '🎉 Rosiane – Coordenadora de Eventos da Rádio\nRosiane é quem dá forma e vida às festas da Rádio SPEAK UP no Club Cooee. Ela cuida de tudo: desde o contato com patrocinadores, a coordenação com a equipe da rádio, até a montagem e organização das salas onde os eventos acontecem.\n\n💡 Como ela contribui:\n\n• Desenvolve o tema e conceito de cada evento\n\n• Cria convites atrativos para o público\n\n• Monta e prepara as salas do evento para garantir a melhor experiência\n\nCom Rosiane no comando, cada festa se torna um momento especial! 🎈'
    },
    {
      nickname: '_MiNizzinha_',
      avatar: '/src/assets/avatars/minni.jpg',
      role: 'Chefe Suporte',
      hierarchy: 4,
      description: '👑 Minnizinha – Chef de Suporte da Rádio\nMinnizinha é a líder da equipe de suporte da Rádio SPEAK UP. Com carisma e responsabilidade, ela garante que tudo funcione nos bastidores — desde a organização de divulgações, até o apoio aos locutores, eventos e patrocinadores.\n\n🎯 Responsabilidades e habilidades:\n\n• Criação de divulgação personalizada para eventos e salas\n\n• Treinamento e orientação dos suportes da equipe\n\n\nCom Minnizinha no comando, o suporte da rádio é forte, organizado e sempre pronto para brilhar! ✨'
    },
   
    {
      nickname: 'Arianny_taina',
      avatar: '/src/assets/avatars/Arriany.jpg',
      role: 'Locutora',
      hierarchy: 5,
      description: '🎧 DJ Arianny – A Energia Old School\nCom um estilo único e cheio de personalidade, DJ Arianny domina a locução com alegria, carisma e muita brincadeira!\nSua vibe mistura o melhor da música internacional com as batidas envolventes do funk brasileiro, sempre com um toque old school que conquista a todos no Club Cooee.\n\nNa SPEAK UP, ela transforma cada transmissão em uma festa inesquecível!\n\n🎶 Estilo musical:\nInternacional, funk brasileiro, old school, animadas e dançantes.'
    },
    {
      nickname: 'Neeeko23',
      avatar: '/src/assets/avatars/Neeko.jpg',
      role: 'Locutora',
      hierarchy: 5,
      description: '⚡ DJ Neeko – A Pikachu Fofa e Animada\nCom seu jeitinho fofo e cheio de energia, DJ Neeko é a explosão de alegria da Rádio SPEAK UP! Sempre animada, ela transforma cada locução em uma festa, levando boas vibrações e diversão para todos os ouvintes.\n\n🎶 Estilo musical:\nToca todos os ritmos, mas com foco nas músicas mais animadas, dançantes e cheias de energia. Seja funk, pop, eletrônico ou forró, a Neeko manda bem em tudo!\n\n🎤 Na locução:\nTransmite alegria e simpatia em cada fala, com aquele toque especial que conquista a galera do Club Cooee.'
    },
    {
      nickname: 'Eduardoworfd',
      avatar: '/src/assets/avatars/eduardo.jpg',
      role: 'Locutor',
      hierarchy: 5,
      description: '🎧 DJ Eduardo – O Cara do Respeito e da Vibração\nDJ Eduardo é um locutor carismático, justo e apaixonado pela música. Com uma vibe respeitosa e animada, ele leva alegria por onde passa e conquista o público com sua autenticidade.\n\n🎶 Estilo musical:\nAmante de música eletrônica, funk, flashback, sertanejo, forró, piseiro, axé e pagode, Eduardo tem um repertório completo que agrada todos os gostos e garante animação do começo ao fim!\n\n🎤 Na locução:\nCom sua energia positiva e presença marcante, DJ Eduardo comanda a festa com responsabilidade, bom humor e muito ritmo.'
    },
    {
      nickname: 'Medusa',
      avatar: '/src/assets/avatars/Medusa.jpg',
      role: 'Locutora',
      hierarchy: 5,
      description: '🎧 DJ Medusa\nA Chuchu\nMeu estilo principal é o piseiro, mas ultimamente tenho tocado de tudo um pouco. Levo animação e alegria em cada locução, sempre buscando deixar o público no clima de festa!\n\nEstilo musical: Funk, sertanejo'
    },
    {
      nickname: '_Joaocdstanque_',
      avatar: '/src/assets/avatars/joao.jpg',
      role: 'Locutor',
      hierarchy: 5,
      description: '🎙️ Voz perfeita, presença marcante e um verdadeiro guapo da rádio! Leva charme e elegância para cada locução.\n\nEstilo musical:\nEspecialista em músicas antigas, que trazem nostalgia e sentimento. Uma verdadeira viagem no tempo com classe. 🎶🕰️'
    },
    {
      nickname: 'Kelly6787',
      avatar: '/src/assets/avatars/Kelly.jpg',
      role: 'Locutora',
      hierarchy: 5,
      description: '✨ Calma, com uma voz bonita que te faz voar. Transmite paz e emoção em cada locução.\n\nEstilo musical:\nTodos os ritmos, mas com destaque especial para as músicas românticas, que tocam o coração. 💖'
    },
    {
      nickname: 'Nengo179',
      avatar: '/src/assets/avatars/nengo.jpg',
      role: 'Locutor',
      hierarchy: 5,
      description: '🎧 Sempre alegre, animado e fazendo todo mundo rir! Conhecido pelas brincadeiras, piadas e uma locução cheia de energia e diversão.\n\nEstilo musical:\nAma músicas internacionais e também curte um pouco de BRs, sempre escolhendo os hits que animam a galera! 🌍🎶'
    },
    {
      nickname: 'DJ Jaque',
      avatar: '/src/assets/avatars/jaque.jpg',
      role: 'Locutora',
      hierarchy: 5,
      description: '🔥 Conhecida como a rainha da putaria, DJ Jaque chega sempre trazendo um clima quente e envolvente! Sua presença no comando das pick-ups é garantia de muita ousadia, risadas e energia no ar.\n\n💃 Estilo musical:\nUm mix irresistível de funk apimentado com músicas internacionais, criando o set perfeito para quem quer dançar sem parar! 🌍🎶'
    },
    
     
  
      {
        nickname: 'DJ McBenjamin',
        avatar: '/src/assets/avatars/benjamin.jpg', // ajuste o caminho se necessário
        role: 'Locutor',
        hierarchy: 5,
        description: 
          '🎧 DJ McBenjamin — A energia Old School! Com um estilo sertanejo carregado das melhores sofrências e um toque de funk para deixar a galera louca para dançar, ele entrega uma presença radiante que conquista todos no Club Cooee. \n\n' +
          'Na rádio Speak Up, é especialista em criar momentos apaixonantes e de pura emoção, fazendo todo mundo entrar no clima e sentir a vibe única de suas transmissões.\n\n' +
          '🎶 Estilo musical:\nSertanejo, funk brasileiro, sofrência, rock clássico e trap.'
      },
      {
        nickname: 'DJ Mutano',
        avatar: '/src/assets/avatars/mutano.jpg', // ajuste o caminho se necessário
        role: 'Locutor',
        hierarchy: 5,
        description: 
          '🔥 DJ Mutano é pura energia! Alegre, animado e um pouco “doido” no melhor sentido, ele transforma qualquer evento em uma verdadeira festa. Sua presença contagiante e irreverente faz todo mundo entrar no clima e dançar sem parar.\n\n' +
          'Na rádio Speak Up, ele é mestre em criar momentos divertidos e memoráveis, sempre com aquele toque de loucura que o público adora.\n\n' +
          '🎶 Estilo musical:\nFunk, sertanejo e flashback — a mistura perfeita para agradar todos os gostos e manter a pista de dança sempre cheia.'
      }
      
      
    
  ];

  const roleColors = {
    'CEO': 'from-yellow-400 to-yellow-600',
    'Chef Design': 'from-red-500 to-red-700',
    'Coord Eventos': 'from-pink-400 to-pink-600',
    'Chefe Suporte': 'from-blue-500 to-cyan-500',
    'Locutor': 'from-purple-500 to-violet-700',
    'Locutora': 'from-purple-500 to-violet-700',
  };

  // Sort members by hierarchy
  const sortedMembers = [...members].sort((a, b) => a.hierarchy - b.hierarchy);

  const handleCardClick = (member) => {
    if (member.description) {
      setSelectedMember(member);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <>
      <section className="py-16 px-4 bg-transparent">
        <h2 className="text-4xl font-extrabold text-center text-white mb-10 drop-shadow-lg tracking-tight">
          {t('team_title')}
        </h2>
        
        {/* CEOs Row */}
        <div className="flex justify-center gap-8 mb-8">
          {sortedMembers.filter(member => member.hierarchy === 1).map((member, idx) => (
            <div
              key={idx}
              className={`glass relative flex flex-col items-center p-8 rounded-3xl shadow-2xl border-2 border-white/10 bg-gradient-to-br from-white/5 to-dark/80 hover:scale-105 transition-transform duration-300 group ${member.description ? 'cursor-pointer' : ''}`}
              style={{boxShadow:'0 0 32px 4px #a21caf55'}}
              onClick={() => handleCardClick(member)}
            >
              <div className="absolute -top-8 left-1/2  -translate-x-1/2 w-24 h-24 rounded-full blur-2xl opacity-60 z-0 group-hover:opacity-90 group-hover:scale-110 transition-all duration-300"
                style={{background: 'linear-gradient(135deg,#a21caf,#7c3aed,#2563eb)'}} />
              <img
                src={member.avatar}
                alt={member.nickname}
                className="w-40 h-40 rounded-full border-4 border-primary shadow-lg relative z-10 object-cover bg-dark"
              />
              <span className="mt-4 text-3xl font-bold text-white drop-shadow tracking-wide relative z-10">
                {member.nickname}
              </span>
              <span
                className={`mt-2 px-4 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${roleColors[member.role]} shadow-md relative z-10`}
              >
                {member.role}
              </span>
            </div>
          ))}
        </div>

        {/* Management Team Row */}
        <div className="flex justify-center gap-8 mb-8">
          {sortedMembers.filter(member => member.hierarchy >= 2 && member.hierarchy <= 4).map((member, idx) => (
            <div
              key={idx}
              className={`glass relative flex flex-col items-center p-8 rounded-3xl shadow-2xl border-2 border-white/10 bg-gradient-to-br from-white/5 to-dark/80 hover:scale-105 transition-transform duration-300 group ${member.description ? 'cursor-pointer' : ''}`}
              style={{boxShadow:'0 0 32px 4px #a21caf55'}}
              onClick={() => handleCardClick(member)}
            >
              <div className="absolute -top-8 left-1/2  -translate-x-1/2 w-24 h-24 rounded-full blur-2xl opacity-60 z-0 group-hover:opacity-90 group-hover:scale-110 transition-all duration-300"
                style={{background: 'linear-gradient(135deg,#a21caf,#7c3aed,#2563eb)'}} />
              <img
                src={member.avatar}
                alt={member.nickname}
                className="w-32 h-32 rounded-full border-4 border-primary shadow-lg relative z-10 object-cover bg-dark"
              />
              <span className="mt-4 text-2xl font-bold text-white drop-shadow tracking-wide relative z-10">
                {member.nickname}
              </span>
              <span
                className={`mt-2 px-4 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${roleColors[member.role]} shadow-md relative z-10`}
              >
                {member.role}
              </span>
            </div>
          ))}
        </div>

        {/* Locutores Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {sortedMembers.filter(member => member.hierarchy === 5).map((member, idx) => (
            <div
              key={idx}
              className={`glass relative flex flex-col items-center p-6 rounded-3xl shadow-2xl border-2 border-white/10 bg-gradient-to-br from-white/5 to-dark/80 hover:scale-105 transition-transform duration-300 group ${member.description ? 'cursor-pointer' : ''}`}
              style={{boxShadow:'0 0 32px 4px #a21caf55'}}
              onClick={() => handleCardClick(member)}
            >
              <div className="absolute -top-6 left-1/2  -translate-x-1/2 w-20 h-20 rounded-full blur-2xl opacity-60 z-0 group-hover:opacity-90 group-hover:scale-110 transition-all duration-300"
                style={{background: 'linear-gradient(135deg,#a21caf,#7c3aed,#2563eb)'}} />
              <img
                src={member.avatar}
                alt={member.nickname}
                className="w-28 h-28 rounded-full border-4 border-primary shadow-lg relative z-10 object-cover bg-dark"
              />
              <span className="mt-3 text-lg font-bold text-white drop-shadow tracking-wide relative z-10 text-center">
                {member.nickname}
              </span>
              <span
                className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${roleColors[member.role]} shadow-md relative z-10`}
              >
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-dark/95 to-dark/90 rounded-3xl p-8 max-w-2xl w-full mx-4 border-2 border-primary/30 shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              ×
            </button>
            
            {/* Modal Content */}
            <div className="flex flex-col items-center text-center">
              <img
                src={selectedMember.avatar}
                alt={selectedMember.nickname}
                className="w-32 h-32 rounded-full border-4 border-primary shadow-lg mb-6 object-cover bg-dark"
              />
              <h3 className="text-3xl font-bold text-white mb-2 drop-shadow">
                {selectedMember.nickname}
              </h3>
              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${roleColors[selectedMember.role]} shadow-md mb-6`}
              >
                {selectedMember.role}
              </span>
              <div className="text-white/90 text-left whitespace-pre-line leading-relaxed">
                {selectedMember.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 