const resolvePreferredLanguage = () => {
  const stored = localStorage.getItem('archguide-language');
  if (stored === 'en') return 'en';
  localStorage.setItem('archguide-language', 'pt');
  return 'pt';
};

let currentLang = resolvePreferredLanguage();
let activeModal = null;
let previousFocus = null;

const commonTranslations = {
  pt: {
    nav_home: 'Início',
    nav_post1: '1. Pré-requisitos MS',
    nav_post2: '2. Micro Frontends',
    nav_post3: '3. Arquiteturas GUI',
    close: 'Fechar janela'
  },
  en: {
    nav_home: 'Home',
    nav_post1: '1. MS Prerequisites',
    nav_post2: '2. Micro Frontends',
    nav_post3: '3. GUI Architectures',
    close: 'Close window'
  }
};

const detailedTranslations = {
  prerequisites: {
    pt: {
      '.styled-list li': [
        '<strong>Detecção precoce de falhas:</strong> Problemas que não aparecem em ambientes de homologação são identificados rapidamente em produção pelo monitoramento técnico e de negócio.',
        '<strong>Redução do tempo de recuperação (MTTR):</strong> Pipelines de deploy rápido viabilizam rollbacks ou correções imediatas sem intervenção manual extensa.',
        '<strong>Sinergia DevOps:</strong> Elimina silos entre quem desenvolve o código e quem mantém o ambiente em execução.',
        '<strong>Benefício direto até para monólitos:</strong> As mesmas competências de automação e monitoramento elevam a qualidade e a confiabilidade de arquiteturas monolíticas.',
        '<strong>Pedágio inicial elevado (Microservice Premium):</strong> Exige investimento prévio pesado em automação, infraestrutura como código e observabilidade antes de colher benefícios.',
        '<strong>Complexidade operacional distribuída:</strong> Rastrear transações de negócio através de dezenas de serviços exige ferramentas avançadas de tracing e correlação de logs.',
        '<strong>Fricção no ambiente de desenvolvimento:</strong> Desenvolvedores precisam alternar constantemente entre múltiplos repositórios, bibliotecas e pipelines.',
        '<strong>Inviabilidade para equipes imaturas:</strong> Organizações sem disciplina de entrega contínua sofrem paralisia operacional ao fragmentar o sistema.'
      ],
      '.mini-card p': [
        'Capacidade de provisionar um novo servidor ou ambiente em poucas horas por meio de automação e infraestrutura em nuvem.',
        'Detecção imediata de anomalias técnicas (erros, latência, disponibilidade) e métricas de negócio (ex.: queda na taxa de pedidos) para permitir rollback rápido.',
        'Existência de um pipeline de implantação automatizado capaz de testar e publicar atualizações em produção em questão de horas.'
      ],
      'main > .section.content-box:nth-child(5) .mini-card p': [
        'Adiciona pacotes de trabalho obrigatórios no início do Gráfico de Gantt (configuração de infraestrutura em nuvem, CI/CD e observabilidade) com folga zero no caminho crítico. Se ignorados no planejamento inicial, causam atrasos severos na fase de integração.',
        'Aumenta o Custo Planejado (PV) nas semanas iniciais devido à aquisição de serviços cloud, ferramentas de monitoramento e horas de engenharia DevOps. Contudo, protege o Índice de Desempenho de Custo (CPI) a médio prazo ao evitar retrabalho manual de deploy.',
        'Demanda capacitação em Docker, Kubernetes, CI/CD e observabilidade (Prometheus/Grafana/OpenTelemetry). Exige reorganizar a equipe do modelo funcional tradicional para times multidisciplinares orientados a produto.',
        '<strong>Estrutura Causa → Evento → Impacto:</strong> Devido à ausência de monitoramento centralizado e deploy automatizado (causa), uma falha em cascata entre serviços não é isolada rapidamente em produção (evento), resultando em indisponibilidade crítica, perda financeira e desvio negativo no SPI e CPI (impacto).'
      ]
    },
    en: {
      '.styled-list li': [
        '<strong>Early failure detection:</strong> Problems that do not appear in staging are identified quickly in production through technical and business monitoring.',
        '<strong>Reduced recovery time (MTTR):</strong> Rapid deployment pipelines enable rollbacks or immediate fixes without extensive manual intervention.',
        '<strong>DevOps synergy:</strong> Removes silos between those who develop the code and those who keep the environment running.',
        '<strong>Direct benefit even for monoliths:</strong> The same automation and monitoring capabilities improve the quality and reliability of monolithic architectures.',
        '<strong>High initial premium (Microservice Premium):</strong> Requires significant upfront investment in automation, infrastructure as code, and observability.',
        '<strong>Distributed operational complexity:</strong> Tracing business transactions across dozens of services requires advanced tracing and log-correlation tools.',
        '<strong>Development-environment friction:</strong> Developers must constantly switch between multiple repositories, libraries, and pipelines.',
        '<strong>Unfit for immature teams:</strong> Organizations without continuous-delivery discipline may become operationally paralyzed after fragmenting the system.'
      ],
      '.mini-card p': [
        'The ability to provision a new server or environment within a few hours through automation and cloud infrastructure.',
        'Immediate detection of technical anomalies (errors, latency, availability) and business metrics (for example, a drop in orders) to enable rapid rollback.',
        'An automated deployment pipeline capable of testing and publishing updates to production within a few hours.'
      ],
      'main > .section.content-box:nth-child(5) .mini-card p': [
        'Adds mandatory work packages at the beginning of the Gantt schedule (cloud infrastructure, CI/CD, and observability) with zero slack on the critical path. If ignored during initial planning, they cause severe integration delays.',
        'Increases Planned Value (PV) in the early weeks through cloud services, monitoring tools, and DevOps engineering hours. However, it protects the Cost Performance Index (CPI) over time by avoiding manual deployment rework.',
        'Requires training in Docker, Kubernetes, CI/CD, and observability (Prometheus/Grafana/OpenTelemetry). It also requires moving from a traditional functional model to multidisciplinary product teams.',
        '<strong>Cause → Event → Impact:</strong> Because centralized monitoring and automated deployment are absent (cause), a cascading failure between services cannot be isolated quickly in production (event), resulting in critical downtime, financial loss, and negative SPI and CPI variance (impact).'
      ]
    }
  },
  microfrontends: {
    pt: {
      'main .content-box:nth-of-type(1) > p': [
        'Enquanto muitas empresas adotaram microsserviços para escalar o desenvolvimento backend, seus frontends permaneceram como grandes monólitos difíceis de manter e evoluir. O artigo define <strong>Micro Frontends</strong> como um estilo arquitetural em que aplicações frontend entregáveis de maneira independente são compostas em um todo maior e coeso.',
        'Na prática, uma aplicação <strong>Container</strong> gerencia elementos comuns (cabeçalho, navegação, autenticação) e orquestra a exibição dos Micro Frontends específicos de cada página ou domínio funcional (ex.: busca de restaurantes, página de pedido, perfil do cliente). A integração pode ocorrer via composição de templates no servidor (SSI), integração em tempo de build (pacotes npm) ou integração em tempo de execução no navegador (iframes, JavaScript ou Web Components).'
      ],
      '.styled-list li': [
        '<strong>Atualizações incrementais:</strong> Permite modernizar ou substituir um monólito legado peça por peça (Strangler Fig), evitando o risco de uma reescrita total.',
        '<strong>Bases de código simples e desacopladas:</strong> Repositórios menores reduzem o acoplamento acidental entre contextos de negócio distintos.',
        '<strong>Deploy independente:</strong> Cada micro frontend possui seu próprio pipeline de CI/CD, reduzindo o escopo e o risco de cada publicação em produção.',
        '<strong>Equipes autônomas e verticais:</strong> Squads assumem responsabilidade de ponta a ponta (do banco à interface) sobre uma fatia vertical de negócio.',
        '<strong>Aumento do tamanho do payload:</strong> Risco de duplicação de dependências e frameworks JavaScript baixados pelo navegador do usuário.',
        '<strong>Diferenças entre ambientes:</strong> Desenvolver um micro frontend isoladamente fora do container pode ocultar conflitos de CSS ou roteamento que só surgem em integração.',
        '<strong>Complexidade operacional e de governança:</strong> Multiplicação de repositórios, pipelines e necessidade de alinhamento constante para evitar fragmentação visual da interface.'
      ],
      'main > .section.content-box:nth-child(5) .mini-card p': [
        'Permite paralelismo real no Gráfico de Gantt: diferentes equipes desenvolvem e entregam páginas complexas simultaneamente sem bloqueios de merge no mesmo repositório, melhorando a Velocity nas sprints.',
        'Eleva o custo de estruturação inicial (criação do Container, pipelines múltiplos e biblioteca de Design System compartilhada), mas reduz o custo de manutenção evolutiva em produtos de grande porte.',
        'Alinha a arquitetura à estrutura organizacional: substitui divisões horizontais (time de CSS, time de API) por equipes multifuncionais focadas na jornada do cliente, reduzindo itens bloqueados no Kanban.',
        '<strong>Estrutura Causa → Evento → Impacto:</strong> Devido à falta de governança sobre dependências e estilos compartilhados entre os micro frontends (causa), ocorre carregamento duplicado de bibliotecas e vazamento de regras CSS (evento), degradando o tempo de carregamento e quebrando o layout em produção (impacto).'
      ]
    },
    en: {
      'main .content-box:nth-of-type(1) > p': [
        'While many companies adopted microservices to scale backend development, their frontends remained large monoliths that were difficult to maintain and evolve. The article defines <strong>Micro Frontends</strong> as an architectural style in which independently deliverable frontend applications are composed into a larger, cohesive whole.',
        'In practice, a <strong>Container</strong> application manages common elements (header, navigation, authentication) and orchestrates the display of Micro Frontends for each page or functional domain (for example, restaurant search, order page, and customer profile). Integration can use server-side template composition (SSI), build-time integration (NPM packages), or run-time browser integration (iframes, JavaScript, or Web Components).'
      ],
      '.styled-list li': [
        '<strong>Incremental upgrades:</strong> Modernizes or replaces a legacy monolith piece by piece (Strangler Fig), avoiding the risk of a full rewrite.',
        '<strong>Simple, decoupled codebases:</strong> Smaller repositories reduce accidental coupling between distinct business contexts.',
        '<strong>Independent deployment:</strong> Each micro frontend has its own CI/CD pipeline, reducing the scope and risk of each production release.',
        '<strong>Autonomous, vertical teams:</strong> Squads own a business slice end to end, from the database to the interface.',
        '<strong>Increased payload size:</strong> Independent bundles can duplicate dependencies and JavaScript frameworks downloaded by the browser.',
        '<strong>Environment differences:</strong> Developing a micro frontend outside the real container can hide CSS or routing conflicts that only appear during integration.',
        '<strong>Operational and governance complexity:</strong> More repositories and pipelines require constant alignment to avoid visual fragmentation.'
      ],
      'main > .section.content-box:nth-child(5) .mini-card p': [
        'Enables real parallelism in the Gantt schedule: different teams develop and deliver complex pages simultaneously without merge bottlenecks in the same repository, improving sprint velocity.',
        'Raises the initial setup cost (Container, multiple pipelines, and a shared Design System library) but reduces evolutionary maintenance cost in large products.',
        'Aligns architecture with organizational structure: replacing horizontal divisions (CSS team, API team) with multidisciplinary teams focused on the customer journey and reducing blocked Kanban items.',
        '<strong>Cause → Event → Impact:</strong> Because dependencies and shared styles lack governance (cause), libraries are loaded repeatedly and CSS rules leak between micro frontends (event), degrading load time and breaking the production layout (impact).'
      ]
    }
  },
  gui: {
    pt: {
      'main > .section.content-box:nth-child(2) > p': ['Martin Fowler analisa a evolução histórica das arquiteturas de interface gráfica, enfatizando a necessidade de separar a lógica de apresentação da lógica de domínio (<strong>Separation of Concerns</strong>) e de sincronizar três tipos de estado: <em>Record State</em> (banco de dados), <em>Session State</em> (objetos em memória da sessão) e <em>Screen State</em> (componentes visuais na tela).'],
      '.mini-card p': ['O formulário organiza controles genéricos, utiliza <em>Data Binding</em> para sincronização básica e trata regras específicas em rotinas de eventos do próprio Form.', 'Divide responsabilidades entre <strong>Model</strong> (regras e estado de domínio sem conhecer a UI), <strong>View</strong> (exibição visual) e <strong>Controller</strong> (tratamento de entrada), sincronizados via padrão <em>Observer</em>.', 'Uma evolução do MVC no VisualWorks que preserva a apresentação separada do domínio e organiza o estado da interface por meio de objetos de propriedade e sincronização por observadores.', 'O <strong>Presenter</strong> atua como mediador ativo que lê o Model e comanda uma View passiva (<em>Humble View</em>), permitindo testar toda a lógica de apresentação sem renderizar widgets gráficos.'],
      '.styled-list li': ['<strong>Alta testabilidade automatizada:</strong> Separar o Model e usar uma Humble View (MVP) permite validar regras de negócio e de apresentação com testes unitários rápidos.', '<strong>Reutilização do domínio:</strong> O mesmo Model pode atender múltiplas Views (interface web, aplicativo mobile, relatórios) sem duplicação de regras de cálculo.', '<strong>Manutenibilidade (ISO/IEC 9126):</strong> Alterações visuais na camada de apresentação não corrompem regras de negócio nem a persistência de dados.', '<strong>Sobrecarga estrutural em telas simples:</strong> Para telas puramente cadastrais (CRUD simples), padrões avançados adicionam classes e interfaces desnecessárias em comparação ao Forms and Controls.', '<strong>Difusão semântica do MVC:</strong> Diferentes frameworks e desenvolvedores interpretam o papel do Controller e do Model de maneiras conflitantes, gerando inconsistência arquitetural.', '<strong>Complexidade de sincronização:</strong> Gerenciar notificações por Observer em telas com dezenas de componentes interdependentes pode criar ciclos de atualização difíceis de depurar.'],
      'main > .section.content-box:nth-child(4) .mini-card p': ['Embora exija maior disciplina no início da codificação, reduz drasticamente o tempo gasto na fase de Testes e Homologação do cronograma, pois defeitos de regra de negócio são capturados em testes unitários imediatos.', 'Quando o cliente solicita uma nova interface (ex.: criar um App Mobile além da Loja Web na EAP), o custo de desenvolvimento cai porque a camada de domínio (Model) é reaproveitada integralmente.', 'Facilita a distribuição de tarefas na sprint: desenvolvedores focados em regras de domínio trabalham no Model/Presenter enquanto especialistas em UI desenvolvem a View sem conflitos de código.', '<strong>Estrutura Causa → Evento → Impacto:</strong> Devido à inserção de regras de cálculo diretamente nos eventos do formulário visual (causa), mudanças de layout exigidas pelo stakeholder quebram a lógica de negócio e impedem testes automatizados (evento), gerando regressões em produção e atraso na entrega do sprint (impacto).']
    },
    en: {
      'main > .section.content-box:nth-child(2) > p': ['Martin Fowler analyzes the historical evolution of graphical user interface architectures, emphasizing the need to separate presentation logic from domain logic (<strong>Separation of Concerns</strong>) and to synchronize three types of state: <em>Record State</em> (the database), <em>Session State</em> (objects held in session memory), and <em>Screen State</em> (visual components on the screen).'],
      '.mini-card p': ['The form organizes generic controls, uses <em>Data Binding</em> for basic synchronization, and handles specific rules in the Form event routines.', 'Separates responsibilities among the <strong>Model</strong> (domain rules and state independent of the UI), <strong>View</strong> (visual display), and <strong>Controller</strong> (input handling), synchronized through the <em>Observer</em> pattern.', 'An evolution of MVC in VisualWorks that preserves separated presentation and domain logic while organizing interface state through property objects and observer synchronization.', 'The <strong>Presenter</strong> actively mediates between the Model and a passive View (<em>Humble View</em>), allowing presentation logic to be tested without rendering graphical widgets.'],
      '.styled-list li': ['<strong>High automated testability:</strong> Separating the Model and using a Humble View (MVP) enables fast unit tests for business and presentation rules.', '<strong>Domain reuse:</strong> The same Model can serve multiple Views (web interface, mobile app, reports) without duplicating calculation rules.', '<strong>Maintainability (ISO/IEC 9126):</strong> Visual changes in the presentation layer do not corrupt business rules or data persistence.', '<strong>Structural overhead on simple screens:</strong> For simple CRUD screens, advanced patterns add unnecessary classes and interfaces compared with Forms and Controls.', '<strong>MVC semantic drift:</strong> Frameworks and developers may interpret Controller and Model responsibilities differently, creating architectural inconsistency.', '<strong>Synchronization complexity:</strong> Managing Observer notifications across many interdependent components can create difficult-to-debug update cycles.'],
      'main > .section.content-box:nth-child(4) .mini-card p': ['Although it requires more discipline at the beginning of coding, it greatly reduces time spent in testing and acceptance because business-rule defects are caught immediately by unit tests.', 'When a client requests a new interface (for example, a mobile app in addition to the web store), development cost falls because the domain layer (Model) can be reused.', 'It supports sprint task distribution: developers focused on domain rules work on the Model/Presenter while UI specialists develop the View without code conflicts.', '<strong>Cause → Event → Impact:</strong> Because calculation rules are inserted directly into visual form events (cause), stakeholder-requested layout changes break business logic and prevent automated tests (event), causing production regressions and sprint delays (impact).']
    }
  }
};

const pageTranslations = {
  home: {
    pt: [
      ['.hero h1', 'Guia Web de Arquitetura de Software e Impacto na Gestão'],
      ['.hero p', 'Análise técnica de três padrões arquiteturais de Martin Fowler e seus desdobramentos diretos em escopo (EAP), cronograma (Gantt/Caminho Crítico), custos (EVM), equipes (Scrum/Kanban) e riscos (ISO 31000).'],
      ['.section-title', 'Eixos Arquiteturais Selecionados'],
      ['.card:nth-child(1) .tag', 'Eixo 1 • Microsserviços'],
      ['.card:nth-child(1) h3', 'Microservice Prerequisites'],
      ['.card:nth-child(1) p', 'Competências operacionais obrigatórias antes de decompor um sistema em microsserviços: provisionamento rápido, monitoramento básico e deploy automatizado.'],
      ['.card:nth-child(2) .tag', 'Eixo 2 • Fronteiras e Evolução'],
      ['.card:nth-child(2) h3', 'Micro Frontends'],
      ['.card:nth-child(2) p', 'Decomposição de monólitos frontend em aplicações menores, desenvolvidas, testadas e implantadas de forma independente por equipes autônomas.'],
      ['.card:nth-child(3) .tag', 'Eixo 3 • Camadas e Execução'],
      ['.card:nth-child(3) h3', 'GUI Architectures'],
      ['.card:nth-child(3) p', 'Evolução das arquiteturas de interface gráfica: Forms and Controls, Model-View-Controller (MVC), Application Model e Model-View-Presenter (MVP).'],
      ['.card .btn-primary', 'Acessar Página'],
      ['.card .btn-outline', 'Resumo Rápido'],
      ['.info-panel > .grid-2 > div:nth-child(1) h3', 'Identificação Acadêmica'],
      ['.info-panel > .grid-2 > div:nth-child(2) h3', 'Integrantes da Equipe'],
      ['.info-panel li:nth-child(1) strong', 'Curso:'],
      ['.info-panel li:nth-child(2) strong', 'Unidade Curricular:'],
      ['.info-panel li:nth-child(3) strong', 'Docente:'],
      ['#modal-identificacao h3', 'Ficha Técnica do Projeto'],
      ['#modal-identificacao p:nth-child(1) strong', 'Instituição:'],
      ['#modal-identificacao p:nth-child(2) strong', 'Curso:'],
      ['#modal-identificacao p:nth-child(3) strong', 'Disciplina:'],
      ['#modal-identificacao p:nth-child(4) strong', 'Normas de Referência:'],
      ['#modal-tripla h3', 'Simulador de Decisão Arquitetural na Restrição Tripla'],
      ['#modal-tripla .modal-body > p', 'A Restrição Tripla representa o equilíbrio entre escopo, tempo e custo. Neste guia, qualidade e risco aparecem como efeitos da decisão arquitetural. Selecione um cenário para visualizar uma simulação didática de impacto; os valores de SPI e CPI são ilustrativos, não dados extraídos dos posts originais.'],
      ['#modal-tripla .scenario-card:nth-child(1) strong', 'Microsserviços'],
      ['#modal-tripla .scenario-card:nth-child(1) span', 'Sem base operacional'],
      ['#modal-tripla .scenario-card:nth-child(2) strong', 'Micro Frontends'],
      ['#modal-tripla .scenario-card:nth-child(2) span', 'Equipes em paralelo'],
      ['#modal-tripla .scenario-card:nth-child(3) strong', 'MVC / MVP'],
      ['#modal-tripla .scenario-card:nth-child(3) span', 'Domínio separado'],
      ['#sim-result p', 'Clique em um dos cenários acima para visualizar os indicadores de impacto (SPI, CPI e Risco).'],
      ['#modal-preview-1 h3', 'Resumo • Microservice Prerequisites'],
      ['#modal-preview-1 p:nth-child(1)', '<strong>Autor:</strong> Martin Fowler (2014)'],
      ['#modal-preview-1 p:nth-child(2)', '<strong>Tríade Obrigatória:</strong> Provisionamento Rápido + Monitoramento Básico + Deploy Automatizado.'],
      ['#modal-preview-1 p:nth-child(3)', '<strong>Impacto Crítico:</strong> Sem cultura DevOps e automação de pipeline, o custo operacional (AC) cresce exponencialmente enquanto o Valor Agregado (EV) estagna.'],
      ['#modal-preview-1 a', 'Ver Análise Completa'],
      ['#modal-preview-2 h3', 'Resumo • Micro Frontends'],
      ['#modal-preview-2 p:nth-child(1)', '<strong>Autor:</strong> Cam Jackson (2019)'],
      ['#modal-preview-2 p:nth-child(2)', '<strong>Conceito:</strong> Fatias verticais de negócio do banco de dados até a interface, gerenciadas por equipes autônomas com deploy independente.'],
      ['#modal-preview-2 p:nth-child(3)', '<strong>Impacto Crítico:</strong> Elimina gargalos de integração entre squads no cronograma, mas exige governança de Design System e controle de bundle.'],
      ['#modal-preview-2 a', 'Ver Análise Completa'],
      ['#modal-preview-3 h3', 'Resumo • GUI Architectures'],
      ['#modal-preview-3 a', 'Ver Análise Completa']
    ],
    en: [
      ['.hero h1', 'Software Architecture Web Guide and Project Management Impact'],
      ['.hero p', 'Technical analysis of three architectural patterns by Martin Fowler and their direct effects on scope (WBS), schedule (Gantt/Critical Path), cost (EVM), teams (Scrum/Kanban), and risks (ISO 31000).'],
      ['.section-title', 'Selected Architectural Axes'],
      ['.card:nth-child(1) .tag', 'Axis 1 • Microservices'],
      ['.card:nth-child(1) h3', 'Microservice Prerequisites'],
      ['.card:nth-child(1) p', 'Operational capabilities required before decomposing a system into microservices: rapid provisioning, basic monitoring, and automated deployment.'],
      ['.card:nth-child(2) .tag', 'Axis 2 • Boundaries and Evolution'],
      ['.card:nth-child(2) h3', 'Micro Frontends'],
      ['.card:nth-child(2) p', 'Decomposing frontend monoliths into smaller applications developed, tested, and deployed independently by autonomous teams.'],
      ['.card:nth-child(3) .tag', 'Axis 3 • Layers and Execution'],
      ['.card:nth-child(3) h3', 'GUI Architectures'],
      ['.card:nth-child(3) p', 'The evolution of graphical user interface architectures: Forms and Controls, Model-View-Controller (MVC), Application Model, and Model-View-Presenter (MVP).'],
      ['.card .btn-primary', 'Open Page'],
      ['.card .btn-outline', 'Quick Summary'],
      ['.info-panel > .grid-2 > div:nth-child(1) h3', 'Academic Identification'],
      ['.info-panel > .grid-2 > div:nth-child(2) h3', 'Team Members'],
      ['.info-panel li:nth-child(1) strong', 'Course:'],
      ['.info-panel li:nth-child(2) strong', 'Course Unit:'],
      ['.info-panel li:nth-child(3) strong', 'Professor:'],
      ['#modal-identificacao h3', 'Project Information Sheet'],
      ['#modal-identificacao p:nth-child(1)', '<strong>Institution:</strong> SENAI Félix Guisard College of Technology - Taubaté/SP'],
      ['#modal-identificacao p:nth-child(2)', '<strong>Course:</strong> Systems Analysis and Development Technology - 4th Semester'],
      ['#modal-identificacao p:nth-child(3)', '<strong>Subject:</strong> Project Management (Prof. Wesley Fioreze)'],
      ['#modal-identificacao p:nth-child(4)', '<strong>Reference Standards:</strong> PMBOK 7th Ed. (PMI), ISO/IEC/IEEE 42010:2022, ISO/IEC 9126, and ISO 31000.'],
      ['#modal-identificacao p:nth-child(1) strong', 'Institution:'],
      ['#modal-identificacao p:nth-child(2) strong', 'Course:'],
      ['#modal-identificacao p:nth-child(3) strong', 'Subject:'],
      ['#modal-identificacao p:nth-child(4) strong', 'Reference Standards:'],
      ['#modal-tripla h3', 'Architectural Decision Simulator: Triple Constraint'],
      ['#modal-tripla .modal-body > p', 'The Triple Constraint represents the balance between scope, time, and cost. In this guide, quality and risk appear as effects of the architectural decision. Select a scenario to view an illustrative impact simulation; SPI and CPI values are examples, not data taken from the original posts.'],
      ['#modal-tripla .scenario-card:nth-child(1) strong', 'Microservices'],
      ['#modal-tripla .scenario-card:nth-child(1) span', 'Without an operational foundation'],
      ['#modal-tripla .scenario-card:nth-child(2) strong', 'Micro Frontends'],
      ['#modal-tripla .scenario-card:nth-child(2) span', 'Parallel teams'],
      ['#modal-tripla .scenario-card:nth-child(3) strong', 'MVC / MVP'],
      ['#modal-tripla .scenario-card:nth-child(3) span', 'Separated domain'],
      ['#sim-result p', 'Select a scenario above to view the impact indicators (SPI, CPI, and Risk).'],
      ['#modal-preview-1 h3', 'Summary • Microservice Prerequisites'],
      ['#modal-preview-1 p:nth-child(1)', '<strong>Author:</strong> Martin Fowler (2014)'],
      ['#modal-preview-1 p:nth-child(2)', '<strong>Required trio:</strong> Rapid Provisioning + Basic Monitoring + Automated Deployment.'],
      ['#modal-preview-1 p:nth-child(3)', '<strong>Critical impact:</strong> Without DevOps culture and pipeline automation, operational cost (AC) grows while Earned Value (EV) stagnates.'],
      ['#modal-preview-1 a', 'View Full Analysis'],
      ['#modal-preview-2 h3', 'Summary • Micro Frontends'],
      ['#modal-preview-2 p:nth-child(1)', '<strong>Author:</strong> Cam Jackson (2019)'],
      ['#modal-preview-2 p:nth-child(2)', '<strong>Concept:</strong> Vertical business slices from the database to the interface, managed by autonomous teams with independent deployment.'],
      ['#modal-preview-2 p:nth-child(3)', '<strong>Critical impact:</strong> Removes integration bottlenecks from the schedule, but requires Design System governance and bundle-size control.'],
      ['#modal-preview-2 a', 'View Full Analysis'],
      ['#modal-preview-3 h3', 'Summary • GUI Architectures'],
      ['#modal-preview-3 a', 'View Full Analysis']
    ]
  },
  prerequisites: {
    pt: [
      ['.page-header .tag', 'Eixo 1 • Microsserviços'], ['.page-header h1', 'Microservice Prerequisites'],
      ['.page-header .subtitle', 'O que uma organização precisa dominar antes de adotar a arquitetura de microsserviços.'],
      ['.page-header .btn-primary', 'Ler Post Original (Martin Fowler)'], ['.page-header .btn-secondary', 'Testar prontidão'], ['.page-header .btn-outline', 'Ver pacote de risco'],
      ['main > .section.content-box:nth-child(2) h2', 'Resumo da Ideia Central'],
      ['main > .section.content-box:nth-child(2) > p:nth-of-type(1)', 'Martin Fowler destaca que, embora desenvolvedores apreciem trabalhar em unidades menores e modulares, a adoção de microsserviços transfere uma carga severa de complexidade para a operação. Em vez de gerenciar um único monólito bem definido, a equipe precisa operar um ecossistema distribuído de múltiplos serviços em produção. Por isso, não se deve adotar microsserviços sem antes possuir três competências operacionais de base:'],
      ['main > .section.content-box:nth-child(2) > p:nth-of-type(2)', 'Esses três pilares exigem uma transformação organizacional profunda: a consolidação de uma <strong>Cultura DevOps</strong> (colaboração estreita entre desenvolvimento e operação na resposta a incidentes e análise de causa raiz) e a transição para equipes orientadas a produto. Para escalar além de poucos serviços, tornam-se necessários rastreamento distribuído (tracing), Entrega Contínua (Continuous Delivery) completa e gestão eficiente de múltiplos repositórios.'],
      ['.mini-card:nth-child(1) h4', '1. Provisionamento Rápido'], ['.mini-card:nth-child(1) p', 'Capacidade de provisionar um novo servidor ou ambiente em poucas horas por meio de automação e infraestrutura em nuvem.'],
      ['.mini-card:nth-child(2) h4', '2. Monitoramento Básico'], ['.mini-card:nth-child(2) p', 'Detecção imediata de anomalias técnicas (erros, latência, disponibilidade) e métricas de negócio (ex.: queda na taxa de pedidos) para permitir rollback rápido.'],
      ['.mini-card:nth-child(3) h4', '3. Deploy Rápido'], ['.mini-card:nth-child(3) p', 'Existência de um pipeline de implantação automatizado capaz de testar e publicar atualizações em produção em questão de horas.'],
      ['main > .section.grid-2 > .content-box:nth-child(1) h2', 'Vantagens'], ['main > .section.grid-2 > .content-box:nth-child(2) h2', 'Desvantagens'], ['main > .section.content-box:nth-child(4) h2', 'Impacto na Gestão do Projeto'],
      ['#modal-ms-checklist h3', 'Microservices Readiness Simulator'], ['#modal-ms-checklist .modal-body > p', 'Mark the prerequisites your team has already met:'],
      ['#modal-ms-risco h3', 'WBS Dictionary and Risk Register • Axis 1'], ['#modal-ms-risco h4', 'WBS Work Package: 2.4 Observability and CI/CD Infrastructure']
    ],
    en: [
      ['.page-header .tag', 'Axis 1 • Microservices'], ['.page-header h1', 'Microservice Prerequisites'],
      ['.page-header .subtitle', 'What an organization needs to master before adopting microservices architecture.'],
      ['.page-header .btn-primary', 'Read Original Post (Martin Fowler)'], ['.page-header .btn-secondary', 'Test Readiness'], ['.page-header .btn-outline', 'View Risk Package'],
      ['main > .section.content-box:nth-child(2) h2', 'Central Idea Summary'],
      ['main > .section.content-box:nth-child(2) > p:nth-of-type(1)', 'Martin Fowler points out that although developers enjoy working with smaller, modular units, adopting microservices transfers a significant burden of complexity to operations. Instead of managing one well-defined monolith, the team must operate a distributed ecosystem of multiple services in production. Therefore, microservices should not be adopted before three baseline operational capabilities exist:'],
      ['main > .section.content-box:nth-child(2) > p:nth-of-type(2)', 'These three pillars require a deep organizational transformation: establishing a <strong>DevOps culture</strong> (close collaboration between development and operations in incident response and root-cause analysis) and moving toward product-oriented teams. Beyond a few services, distributed tracing, full Continuous Delivery, and effective management of multiple repositories become necessary.'],
      ['.mini-card:nth-child(1) h4', '1. Rapid Provisioning'], ['.mini-card:nth-child(1) p', 'The ability to provision a new server or environment within a few hours through automation and cloud infrastructure.'],
      ['.mini-card:nth-child(2) h4', '2. Basic Monitoring'], ['.mini-card:nth-child(2) p', 'Immediate detection of technical anomalies (errors, latency, availability) and business metrics (for example, a drop in orders) to enable rapid rollback.'],
      ['.mini-card:nth-child(3) h4', '3. Rapid Deployment'], ['.mini-card:nth-child(3) p', 'An automated deployment pipeline capable of testing and publishing updates to production within a few hours.'],
      ['main > .section.grid-2 > .content-box:nth-child(1) h2', 'Advantages'], ['main > .section.grid-2 > .content-box:nth-child(2) h2', 'Disadvantages'], ['main > .section.content-box:nth-child(4) h2', 'Project Management Impact'],
      ['#modal-ms-checklist h3', 'Microservices Readiness Simulator'], ['#modal-ms-checklist .modal-body > p', 'Check the prerequisites your team has already met:'],
      ['#modal-ms-risco h3', 'WBS Dictionary and Risk Register • Axis 1'], ['#modal-ms-risco h4', 'WBS Work Package: 2.4 Observability and CI/CD Infrastructure']
    ]
  },
  microfrontends: {
    pt: [
      ['.page-header .tag', 'Eixo 2 • Fronteiras e Evolução'], ['.page-header h1', 'Micro Frontends'], ['.page-header .subtitle', 'Aplicações frontend entregáveis de forma independente e compostas em um produto único.'], ['.page-header .btn-primary', 'Ler Post Original (Cam Jackson)'], ['.page-header .btn-secondary', 'Comparar integrações'], ['.page-header .btn-outline', 'Visualizar fluxo da equipe'],
      ['main > .section.content-box:nth-child(2) h2', 'Resumo da Ideia Central'], ['main > .section.grid-2 > .content-box:nth-child(1) h2', 'Vantagens'], ['main > .section.grid-2 > .content-box:nth-child(2) h2', 'Desvantagens'], ['main > .section.content-box:nth-child(4) h2', 'Impacto na Gestão do Projeto'],
      ['#modal-mfe-integracao h3', 'Abordagens de Integração de Micro Frontends'], ['#modal-mfe-integracao .sim-controls button:nth-child(1)', 'Build-time (NPM)'], ['#modal-mfe-integracao .sim-controls button:nth-child(2)', 'Run-time (iframes)'], ['#modal-mfe-integracao .sim-controls button:nth-child(3)', 'Run-time (JS / Web Components)'], ['#mfe-approach-box p', 'Selecione uma abordagem acima para analisar seus trade-offs técnicos e de gestão.'],
      ['#modal-mfe-kanban h3', 'Decomposição na EAP e Fluxo Kanban • Eixo 2']
    ],
    en: [
      ['.page-header .tag', 'Axis 2 • Boundaries and Evolution'], ['.page-header h1', 'Micro Frontends'], ['.page-header .subtitle', 'Frontend applications that can be delivered independently and composed into a single product.'], ['.page-header .btn-primary', 'Read Original Post (Cam Jackson)'], ['.page-header .btn-secondary', 'Compare Integrations'], ['.page-header .btn-outline', 'View Team Flow'],
      ['main > .section.content-box:nth-child(2) h2', 'Central Idea Summary'], ['main > .section.grid-2 > .content-box:nth-child(1) h2', 'Advantages'], ['main > .section.grid-2 > .content-box:nth-child(2) h2', 'Disadvantages'], ['main > .section.content-box:nth-child(4) h2', 'Project Management Impact'],
      ['#modal-mfe-integracao h3', 'Micro Frontend Integration Approaches'], ['#modal-mfe-integracao .sim-controls button:nth-child(1)', 'Build-time (NPM)'], ['#modal-mfe-integracao .sim-controls button:nth-child(2)', 'Run-time (iframes)'], ['#modal-mfe-integracao .sim-controls button:nth-child(3)', 'Run-time (JS / Web Components)'], ['#mfe-approach-box p', 'Select an approach above to analyze its technical and management trade-offs.'],
      ['#modal-mfe-kanban h3', 'WBS Decomposition and Kanban Flow • Axis 2']
    ]
  },
  gui: {
    pt: [
      ['.page-header .tag', 'Eixo 3 • Camadas e Execução'], ['.page-header h1', 'GUI Architectures'], ['.page-header .subtitle', 'Evolução dos padrões arquiteturais de interface gráfica: Forms and Controls, MVC, Application Model e MVP.'], ['.page-header .btn-primary', 'Ler Post Original (Martin Fowler)'], ['.page-header .btn-secondary', 'Simular o fluxo'], ['.page-header .btn-outline', 'Explorar estados da UI'],
      ['main > .section.content-box:nth-child(2) h2', 'Resumo da Ideia Central'], ['main > .section.grid-2 > .content-box:nth-child(1) h2', 'Vantagens'], ['main > .section.grid-2 > .content-box:nth-child(2) h2', 'Desvantagens'], ['main > .section.content-box:nth-child(4) h2', 'Impacto na Gestão do Projeto'],
      ['#modal-gui-fluxo h3', 'Simulador Interativo: Cálculo de Variância (Exemplo de Fowler)'], ['#modal-gui-fluxo .modal-intro', 'Altere os valores e acompanhe como a regra percorre o Model, o Presenter e a View.'], ['#modal-gui-fluxo .modal-tab:nth-child(1)', 'Simulador'], ['#modal-gui-fluxo .modal-tab:nth-child(2)', 'Fluxo'], ['#modal-gui-estados h3', 'Os Três Estados de Dados em Arquiteturas GUI'], ['#modal-gui-estados .modal-intro', 'Selecione um estado para entender onde ele vive e quem deve controlá-lo.']
    ],
    en: [
      ['.page-header .tag', 'Axis 3 • Layers and Execution'], ['.page-header h1', 'GUI Architectures'], ['.page-header .subtitle', 'The evolution of graphical user interface architectures: Forms and Controls, MVC, Application Model, and MVP.'], ['.page-header .btn-primary', 'Read Original Post (Martin Fowler)'], ['.page-header .btn-secondary', 'Simulate the Flow'], ['.page-header .btn-outline', 'Explore UI States'],
      ['main > .section.content-box:nth-child(2) h2', 'Central Idea Summary'], ['main > .section.grid-2 > .content-box:nth-child(1) h2', 'Advantages'], ['main > .section.grid-2 > .content-box:nth-child(2) h2', 'Disadvantages'], ['main > .section.content-box:nth-child(4) h2', 'Project Management Impact'],
      ['#modal-gui-fluxo h3', 'Interactive Simulator: Variance Calculation (Fowler Example)'], ['#modal-gui-fluxo .modal-intro', 'Change the values and follow the rule through the Model, Presenter, and View.'], ['#modal-gui-fluxo .modal-tab:nth-child(1)', 'Simulator'], ['#modal-gui-fluxo .modal-tab:nth-child(2)', 'Flow'], ['#modal-gui-estados h3', 'The Three Data States in GUI Architectures'], ['#modal-gui-estados .modal-intro', 'Select a state to understand where it lives and who should control it.']
    ]
  }
};

const additionalTranslations = {
  home: {
    pt: [
      ['.info-panel li:nth-child(1) span', 'Superior de Tecnologia em Análise e Desenvolvimento de Sistemas (4º semestre)'],
      ['.info-panel li:nth-child(2) span', 'Gestão de Projetos'],
      ['.info-panel li:nth-child(3)', '<strong>Docente:</strong> Prof. Wesley Fioreze'],
      ['main > .section.info-panel .interactive-panel p', '<strong>Sobre esta entrega:</strong> a ficha técnica reúne instituição, disciplina, normas de referência e identificação do projeto.'],
      ['main > .section.content-box .interactive-panel p', '<strong>Escolha um cenário para comparar:</strong> microsserviços sem base operacional, Micro Frontends com equipes em paralelo ou MVC/MVP com domínio separado.'],
      ['main > .section.content-box h2', 'Como as decisões arquiteturais pressionam o projeto'],
      ['main > .section.content-box > p', 'A Restrição Tripla relaciona escopo, tempo e custo. Neste guia, qualidade e risco aparecem como efeitos das decisões arquiteturais. O simulador abaixo é uma demonstração didática: os valores de SPI e CPI são exemplos criados para comparar cenários, não dados retirados dos posts originais.'],
      ['#modal-preview-3 p:nth-child(1)', '<strong>Autor:</strong> Martin Fowler (2006)'],
      ['#modal-preview-3 p:nth-child(2)', '<strong>Conceito:</strong> As arquiteturas GUI evoluem de Forms and Controls para MVC, Application Model e MVP (Humble View), isolando os estados de tela, sessão e registro.'],
      ['#modal-preview-3 p:nth-child(3)', '<strong>Impacto crítico:</strong> Permite testes automatizados rápidos sem dependências da interface gráfica, reduzindo retrabalho e melhorando a manutenibilidade.']
    ],
    en: [
      ['.info-panel li:nth-child(1) span', 'Systems Analysis and Development (4th semester)'],
      ['.info-panel li:nth-child(2) span', 'Project Management'],
      ['.info-panel li:nth-child(3)', '<strong>Professor:</strong> Prof. Wesley Fioreze'],
      ['main > .section.info-panel .interactive-panel p', '<strong>About this delivery:</strong> the information sheet brings together the institution, subject, reference standards, and project identification.'],
      ['.interactive-panel button', 'Open complete information sheet'],
      ['main > .section.content-box h2', 'How architectural decisions pressure the project'],
      ['main > .section.content-box > p', 'The Triple Constraint relates scope, time, and cost. In this guide, quality and risk appear as effects of architectural decisions. The simulator below is an educational demonstration: SPI and CPI values are examples created to compare scenarios, not data taken from the original posts.'],
      ['main > .section.content-box .interactive-panel p', '<strong>Choose a scenario to compare:</strong> microservices without an operational foundation, Micro Frontends with parallel teams, or MVC/MVP with a separated domain.'],
      ['main > .section.content-box .interactive-panel button', 'Open explained simulator'],
      ['.footer p', 'Software Architecture Web Guide • Project Management • SENAI Félix Guisard (2026)'],
      ['#modal-preview-3 p:nth-child(1)', '<strong>Author:</strong> Martin Fowler (2006)'],
      ['#modal-preview-3 p:nth-child(2)', '<strong>Concept:</strong> GUI architectures evolve from Forms and Controls to MVC, Application Model, and MVP (Humble View) to isolate screen, session, and record state.'],
      ['#modal-preview-3 p:nth-child(3)', '<strong>Critical impact:</strong> Enables fast automated tests without graphical-interface dependencies, reducing rework and improving maintainability.']
    ]
  },
  prerequisites: {
    pt: [
      ['.interactive-panel p', '<strong>Aplicação prática:</strong> use o checklist para avaliar se a equipe possui a base operacional necessária antes de assumir a complexidade de microsserviços.'],
      ['.interactive-panel button', 'Abrir checklist de prontidão'],
      ['main > .section.content-box:nth-child(4) h2', 'Registro de risco e pacote de trabalho'],
      ['main > .section.content-box:nth-child(4) p', 'O risco arquitetural pode ser convertido em um pacote de trabalho da EAP: automatizar infraestrutura, observabilidade e CI/CD antes da expansão do número de serviços.'],
      ['main > .section.content-box:nth-child(4) button', 'Ver dicionário da EAP e registro de risco'],
      ['main > .section.content-box:nth-child(5) h2', 'Impacto na Gestão do Projeto'],
      ['main > .section.content-box:nth-child(5) .mini-card:nth-child(1) h4', 'Prazo (Cronograma e Caminho Crítico)'],
      ['main > .section.content-box:nth-child(5) .mini-card:nth-child(2) h4', 'Custo (Orçamento e EVM)'],
      ['main > .section.content-box:nth-child(5) .mini-card:nth-child(3) h4', 'Equipe (Recursos e Comunicação)'],
      ['main > .section.content-box:nth-child(5) .mini-card:nth-child(4) h4', 'Riscos (ISO 31000)'],
      ['#modal-ms-checklist h3', 'Simulador de Prontidão para Microsserviços'],
      ['#modal-ms-checklist .modal-body > p', 'Marque os pré-requisitos já atendidos pela sua equipe no projeto:'],
      ['#modal-ms-risco h3', 'Dicionário da EAP e Registro de Risco • Eixo 1'],
      ['#modal-ms-risco h4', 'Pacote de Trabalho da EAP: 2.4 Infraestrutura de Observabilidade e CI/CD']
    ],
    en: [
      ['.interactive-panel p', '<strong>Practical application:</strong> use the checklist to assess whether the team has the operational foundation required before taking on microservices complexity.'],
      ['.interactive-panel button', 'Open readiness checklist'],
      ['main > .section.content-box:nth-child(4) h2', 'Risk register and work package'],
      ['main > .section.content-box:nth-child(4) p', 'The architectural risk can be converted into a WBS work package: automate infrastructure, observability, and CI/CD before expanding the number of services.'],
      ['main > .section.content-box:nth-child(4) button', 'View WBS dictionary and risk register'],
      ['main > .section.content-box:nth-child(5) h2', 'Project Management Impact'],
      ['main > .section.content-box:nth-child(5) .mini-card:nth-child(1) h4', 'Schedule (Critical Path)'],
      ['main > .section.content-box:nth-child(5) .mini-card:nth-child(2) h4', 'Cost (EVM)'],
      ['main > .section.content-box:nth-child(5) .mini-card:nth-child(3) h4', 'Team (Resources and Communication)'],
      ['main > .section.content-box:nth-child(5) .mini-card:nth-child(4) h4', 'Risks (ISO 31000)'],
      ['#modal-ms-checklist label:nth-child(1)', 'Provisioning new servers/containers within a few hours'],
      ['#modal-ms-checklist label:nth-child(2)', 'Active technical monitoring (HTTP errors, latency, CPU/RAM)'],
      ['#modal-ms-checklist label:nth-child(3)', 'Real-time monitoring of business metrics'],
      ['#modal-ms-checklist label:nth-child(4)', 'Automated CI/CD pipeline with rapid rollback capability'],
      ['#modal-ms-checklist label:nth-child(5)', 'DevOps culture with developers and operations working together'],
      ['#modal-ms-checklist #ms-readiness-result', '<strong>Diagnosis:</strong> 0/5 met. Extreme Risk: keep the architecture monolithic until the operational foundation is built.'],
      ['#modal-ms-risco p', '<strong>Acceptance criterion:</strong> complete deployment in less than 15 minutes with automatic error alerts.'],
      ['#modal-ms-risco li:nth-child(1)', '<strong>Technical description:</strong> configure an automated build/deployment pipeline and collect metrics with Prometheus and Grafana.'],
      ['#modal-ms-risco li:nth-child(2)', '<strong>Acceptance criterion:</strong> complete deployment in less than 15 minutes with automatic alerts.'],
      ['#modal-ms-risco li:nth-child(3)', '<strong>ISO/IEC 9126 attributes:</strong> reliability (fault tolerance and recoverability) and maintainability (analyzability).'],
      ['.footer p', 'Software Architecture Web Guide • Project Management • SENAI Félix Guisard (2026)']
    ]
  },
  microfrontends: {
    pt: [
      ['.interactive-panel:nth-of-type(1) p', '<strong>Como a composição muda a gestão:</strong> cada abordagem de integração altera o grau de independência, isolamento e governança entre as equipes.'],
      ['.interactive-panel:nth-of-type(1) button', 'Comparar abordagens de integração'],
      ['main > .section.content-box:nth-child(4) h2', 'Aplicação na EAP e no Kanban'],
      ['main > .section.content-box:nth-child(4) p', 'O frontend pode ser decomposto por domínio de negócio, com limites de responsabilidade e WIP definidos para cada squad. A visualização abaixo detalha como essa decomposição afeta o planejamento.'],
      ['main > .section.content-box:nth-child(4) button', 'Ver fluxo contextual da equipe'],
      ['main > .section.content-box:nth-child(5) h2', 'Impacto na Gestão do Projeto'],
      ['main > .section.content-box:nth-child(5) .mini-card:nth-child(1) h4', 'Prazo (Cronograma e Paralelismo)'],
      ['main > .section.content-box:nth-child(5) .mini-card:nth-child(2) h4', 'Custo (Orçamento e Recursos)'],
      ['main > .section.content-box:nth-child(5) .mini-card:nth-child(3) h4', 'Equipe (Lei de Conway e Ágil)'],
      ['main > .section.content-box:nth-child(5) .mini-card:nth-child(4) h4', 'Riscos (ISO 31000)'],
      ['#modal-mfe-kanban p:nth-child(1)', '<strong>Impacto na EAP (Regra dos 100%):</strong> o ramo de Frontend deixa de ser um pacote monolítico e passa a ser decomposto por domínio de negócio (3.2.1 Container App, 3.2.2 MFE Catálogo, 3.2.3 MFE Checkout).'],
      ['#modal-mfe-kanban p:nth-child(2)', '<strong>Impacto no WIP (Kanban):</strong> cada squad controla seu próprio limite de Work In Progress sem travar a coluna de deploy das demais equipes.']
    ],
    en: [
      ['.interactive-panel:nth-of-type(1) p', '<strong>How composition changes management:</strong> each integration approach changes the degree of independence, isolation, and governance between teams.'],
      ['.interactive-panel:nth-of-type(1) button', 'Compare integration approaches'],
      ['main > .section.content-box:nth-child(4) h2', 'Application to WBS and Kanban'],
      ['main > .section.content-box:nth-child(4) p', 'The frontend can be decomposed by business domain, with responsibility boundaries and WIP limits defined for each squad. The view below details how this decomposition affects planning.'],
      ['main > .section.content-box:nth-child(4) button', 'View contextual team flow'],
      ['main > .section.content-box:nth-child(5) h2', 'Project Management Impact'],
      ['main > .section.content-box:nth-child(5) .mini-card:nth-child(1) h4', 'Schedule (Parallelism)'],
      ['main > .section.content-box:nth-child(5) .mini-card:nth-child(2) h4', 'Cost (Budget and Resources)'],
      ['main > .section.content-box:nth-child(5) .mini-card:nth-child(3) h4', 'Team (Conway’s Law and Agile)'],
      ['main > .section.content-box:nth-child(5) .mini-card:nth-child(4) h4', 'Risks (ISO 31000)'],
      ['#modal-mfe-kanban p:nth-child(1)', '<strong>WBS impact (100% rule):</strong> the Frontend branch stops being one monolithic package and is decomposed by business domain (3.2.1 Container App, 3.2.2 Catalog MFE, 3.2.3 Checkout MFE).'],
      ['#modal-mfe-kanban p:nth-child(2)', '<strong>WIP impact (Kanban):</strong> each squad controls its own Work In Progress limit without blocking the other teams’ deployment column.'],
      ['.footer p', 'Software Architecture Web Guide • Project Management • SENAI Félix Guisard (2026)']
    ]
  },
  gui: {
    pt: [
      ['.mini-card:nth-child(1) h4', '1. Forms and Controls'],
      ['.mini-card:nth-child(2) h4', '2. Model-View-Controller (MVC)'],
      ['.mini-card:nth-child(3) h4', '3. VisualWorks Application Model'],
      ['.mini-card:nth-child(4) h4', '4. MVP e Humble View'],
      ['.interactive-panel p', '<strong>Leitura visual:</strong> o simulador acompanha a regra pelo Model, Presenter e View, enquanto o explorador de estados mostra onde cada cópia dos dados vive e quem deve controlá-la.'],
      ['.interactive-panel .btn-secondary', 'Abrir simulador de fluxo'],
      ['.interactive-panel .btn-outline', 'Explorar estados da interface'],
      ['main > .section.content-box:nth-child(4) h2', 'Impacto na Gestão do Projeto'],
      ['main > .section.content-box:nth-child(4) .mini-card:nth-child(1) h4', 'Prazo (Cronograma e Homologação)'],
      ['main > .section.content-box:nth-child(4) .mini-card:nth-child(2) h4', 'Custo (Redução de Retrabalho)'],
      ['main > .section.content-box:nth-child(4) .mini-card:nth-child(3) h4', 'Equipe (Divisão de Trabalho)'],
      ['main > .section.content-box:nth-child(4) .mini-card:nth-child(4) h4', 'Riscos (ISO 31000)'],
      ['#gui-panel-simulador label:nth-child(1)', 'Meta (Target):'],
      ['#gui-panel-simulador label:nth-child(2)', 'Leitura (Actual):'],
      ['#gui-panel-fluxo .flow-node:nth-child(1) span', 'Calcula a variância'],
      ['#gui-panel-fluxo .flow-node:nth-child(2) span', 'Interpreta o resultado'],
      ['#gui-panel-fluxo .flow-node:nth-child(3) span', 'Exibe o estado'],
      ['#gui-panel-fluxo .sim-box strong', 'Teste a separação:'],
      ['#gui-panel-fluxo .sim-box p', 'A View recebe apenas o resultado preparado. A regra de comparação não precisa conhecer nenhum widget.']
    ],
    en: [
      ['.mini-card:nth-child(1) h4', '1. Forms and Controls'],
      ['.mini-card:nth-child(2) h4', '2. Model-View-Controller (MVC)'],
      ['.mini-card:nth-child(3) h4', '3. VisualWorks Application Model'],
      ['.mini-card:nth-child(4) h4', '4. MVP and Humble View'],
      ['.interactive-panel p', '<strong>Visual reading:</strong> the simulator follows the rule through the Model, Presenter, and View, while the state explorer shows where each copy of the data lives and who should control it.'],
      ['.interactive-panel .btn-secondary', 'Open flow simulator'],
      ['.interactive-panel .btn-outline', 'Explore interface states'],
      ['main > .section.content-box:nth-child(4) h2', 'Project Management Impact'],
      ['main > .section.content-box:nth-child(4) .mini-card:nth-child(1) h4', 'Schedule (Testing and Acceptance)'],
      ['main > .section.content-box:nth-child(4) .mini-card:nth-child(2) h4', 'Cost (Reduced Rework)'],
      ['main > .section.content-box:nth-child(4) .mini-card:nth-child(3) h4', 'Team (Work Distribution)'],
      ['main > .section.content-box:nth-child(4) .mini-card:nth-child(4) h4', 'Risks (ISO 31000)'],
      ['#gui-panel-simulador label:nth-child(1)', 'Target:'],
      ['#gui-panel-simulador label:nth-child(2)', 'Actual:'],
      ['#gui-panel-fluxo .flow-node:nth-child(1) span', 'Calculates variance'],
      ['#gui-panel-fluxo .flow-node:nth-child(2) span', 'Interprets the result'],
      ['#gui-panel-fluxo .flow-node:nth-child(3) span', 'Displays the state'],
      ['#gui-panel-fluxo .sim-box strong', 'Test the separation:'],
      ['#gui-panel-fluxo .sim-box p', 'The View receives only the prepared result. The comparison rule does not need to know any widget.'],
      ['#modal-gui-estados .state-card:nth-child(1) span', 'Persisted in the database'],
      ['#modal-gui-estados .state-card:nth-child(2) span', 'Session memory'],
      ['#modal-gui-estados .state-card:nth-child(3) span', 'Screen controls'],
      ['#gui-state-detail', '<strong>Record State</strong><p>The persisted and shared source of truth. Changes must pass through domain rules before reaching the screen.</p>'],
      ['.footer p', 'Software Architecture Web Guide • Project Management • SENAI Félix Guisard (2026)']
    ]
  }
};

function setText(selector, value) {
  document.querySelectorAll(selector).forEach(element => {
    element.innerHTML = value;
  });
}

function setLabelText(selector, value) {
  document.querySelectorAll(selector).forEach(label => {
    const input = label.querySelector('input');
    if (input) {
      const textNodes = Array.from(label.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
      if (textNodes.length > 0) {
        textNodes[0].nodeValue = ` ${value}`;
        textNodes.slice(1).forEach(node => node.remove());
      } else {
        label.appendChild(document.createTextNode(` ${value}`));
      }
    } else {
      label.textContent = value;
    }
  });
}

function applyStaticTranslations() {
  const lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const value = {
      nav_home: commonTranslations[lang].nav_home,
      nav_post1: commonTranslations[lang].nav_post1,
      nav_post2: commonTranslations[lang].nav_post2,
      nav_post3: commonTranslations[lang].nav_post3
    }[key];
    if (value) element.textContent = value;
  });
  const page = document.body.dataset.page;
  const entries = pageTranslations[page];
  if (entries) entries[lang].forEach(([selector, value]) => setText(selector, value));
  const detailed = detailedTranslations[page];
  if (detailed) {
    Object.entries(detailed[lang]).forEach(([selector, values]) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        if (values[index] !== undefined) element.innerHTML = values[index];
      });
    });
  }
  const additional = additionalTranslations[page];
  if (additional && additional[lang]) {
    additional[lang].forEach(([selector, value]) => {
      if (selector.includes('label')) setLabelText(selector, value);
      else setText(selector, value);
    });
  }
  document.querySelectorAll('.state-card strong').forEach(el => {
    el.style.color = getComputedStyle(document.body).getPropertyValue('--text-primary');
  });
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    const label = lang === 'pt' ? 'Switch to English' : 'Mudar para PT-BR';
    langToggle.textContent = label;
    langToggle.setAttribute('aria-label', label);
  }
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  const titles = {
    home: {
      pt: 'Guia Web de Arquitetura de Software - Gestão de Projetos',
      en: 'Software Architecture Web Guide - Project Management'
    },
    prerequisites: {
      pt: 'Microservice Prerequisites - Guia de Arquitetura',
      en: 'Microservice Prerequisites - Architecture Guide'
    },
    microfrontends: {
      pt: 'Micro Frontends - Guia de Arquitetura',
      en: 'Micro Frontends - Architecture Guide'
    },
    gui: {
      pt: 'GUI Architectures - Guia de Arquitetura',
      en: 'GUI Architectures - Architecture Guide'
    }
  };
  document.title = titles[page][lang];
  document.querySelectorAll('.modal-close').forEach(button => button.setAttribute('aria-label', commonTranslations[lang].close));
}

function toggleLanguage() {
  currentLang = currentLang === 'pt' ? 'en' : 'pt';
  localStorage.setItem('archguide-language', currentLang);
  applyStaticTranslations();
  refreshDynamicOutput();
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  previousFocus = document.activeElement;
  activeModal = modal;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  document.body.classList.add('modal-open');
  const closeButton = modal.querySelector('.modal-close');
  if (closeButton) {
    closeButton.setAttribute('aria-label', commonTranslations[currentLang].close);
    closeButton.focus();
  }
  if (id === 'modal-gui-fluxo') runGuiSimulation();
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  activeModal = null;
  document.body.classList.remove('modal-open');
  if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
}

function switchModalTab(button, panelId) {
  const modal = button.closest('.modal');
  if (!modal) return;
  modal.querySelectorAll('.modal-tab').forEach(tab => tab.classList.remove('active'));
  modal.querySelectorAll('.modal-panel').forEach(panel => panel.classList.remove('active'));
  button.classList.add('active');
  const panel = modal.querySelector(`#${panelId}`);
  if (panel) panel.classList.add('active');
}

function showGuiState(state, button) {
  const details = {
    pt: {
      record: '<strong>Record State</strong><p>É a fonte persistida e compartilhada. Alterações aqui precisam passar por regras do domínio antes de chegar à tela.</p>',
      session: '<strong>Session State</strong><p>É a representação temporária usada durante a sessão. O Presenter ou o Model coordena alterações antes do commit.</p>',
      screen: '<strong>Screen State</strong><p>É o que o usuário vê e edita nos controles. A View apresenta esse estado, mas não deve decidir regras de negócio.</p>'
    },
    en: {
      record: '<strong>Record State</strong><p>The persisted and shared source of truth. Changes must pass through domain rules before reaching the screen.</p>',
      session: '<strong>Session State</strong><p>The temporary representation used during a session. The Presenter or Model coordinates changes before commit.</p>',
      screen: '<strong>Screen State</strong><p>What the user sees and edits in the controls. The View presents this state but should not decide business rules.</p>'
    }
  };
  const output = document.getElementById('gui-state-detail');
  if (!output) return;
  document.querySelectorAll('.state-card').forEach(card => card.classList.remove('active'));
  if (button) button.classList.add('active');
  output.innerHTML = details[currentLang][state] || '';
}

function scenarioMarkup(type) {
  const data = {
    pt: {
      ms: ['<strong>Microsserviços sem pré-requisitos</strong>', 'Atraso na integração, deploy manual e horas extras de operação.', 'Alto'],
      mfe: ['<strong>Escalar equipes com Micro Frontends</strong>', 'Entregas paralelas com investimento inicial em Container e CI/CD.', 'Médio'],
      mvc: ['<strong>Separar domínio com MVC / MVP</strong>', 'Menos bugs na homologação e reaproveitamento do Model em outras interfaces.', 'Baixo']
    },
    en: {
      ms: ['<strong>Microservices without prerequisites</strong>', 'Integration delays, manual deployment, and operational overtime.', 'High'],
      mfe: ['<strong>Scale teams with Micro Frontends</strong>', 'Parallel delivery with initial investment in the Container and CI/CD.', 'Medium'],
      mvc: ['<strong>Separate the domain with MVC / MVP</strong>', 'Fewer validation bugs and Model reuse across other interfaces.', 'Low']
    }
  };
  const item = data[currentLang][type];
  const labels = currentLang === 'pt' ? ['Prazo (SPI)', 'Custo (CPI)', 'Risco'] : ['Schedule (SPI)', 'Cost (CPI)', 'Risk'];
  const values = { ms: ['0.72', '0.68'], mfe: ['1.08', '0.94'], mvc: ['1.04', '1.10'] }[type];
  return `${item[0]}<div class="metric-grid"><div class="metric"><small>${labels[0]}</small><strong>${values[0]}</strong></div><div class="metric"><small>${labels[1]}</small><strong>${values[1]}</strong></div><div class="metric"><small>${labels[2]}</small><strong>${item[2]}</strong></div></div><p class="mt-1">${item[1]}</p>`;
}

function simulateScenario(type) {
  const box = document.getElementById('sim-result');
  if (!box) return;
  document.querySelectorAll('.scenario-card').forEach(card => card.classList.toggle('active', card.dataset.scenario === type));
  box.innerHTML = scenarioMarkup(type);
  box.setAttribute('data-status', type === 'ms' ? 'danger' : type === 'mfe' ? 'warning' : 'success');
}

function evaluateMsReadiness() {
  const checks = document.querySelectorAll('.ms-check:checked').length;
  const box = document.getElementById('ms-readiness-result');
  const progress = document.getElementById('ms-readiness-progress');
  if (!box) return;
  if (progress) progress.style.width = `${checks * 20}%`;
  const messages = currentLang === 'pt'
    ? checks <= 2 ? `<strong>Diagnóstico:</strong> ${checks}/5 atendidos. <span style="color:#f85149">Risco Crítico:</span> Não adote microsserviços agora. Priorize automação de deploy e monitoramento básico no monólito.` : checks <= 4 ? `<strong>Diagnóstico:</strong> ${checks}/5 atendidos. <span style="color:#d29922">Atenção:</span> Capacidade parcial. Conclua o pipeline automatizado e alinhe a cultura DevOps antes de escalar serviços.` : `<strong>Diagnóstico:</strong> 5/5 atendidos. <span style="color:#3fb950">Apto:</span> Pré-requisitos de base validados para iniciar com um conjunto enxuto de microsserviços.`
    : checks <= 2 ? `<strong>Diagnosis:</strong> ${checks}/5 met. <span style="color:#f85149">Critical Risk:</span> Do not adopt microservices yet. Prioritize deployment automation and basic monitoring in the monolith.` : checks <= 4 ? `<strong>Diagnosis:</strong> ${checks}/5 met. <span style="color:#d29922">Warning:</span> Partial capability. Finish the automated pipeline and align the DevOps culture before scaling services.` : `<strong>Diagnosis:</strong> 5/5 met. <span style="color:#3fb950">Ready:</span> Baseline prerequisites validated to start with a small set of microservices.`;
  box.innerHTML = messages;
  box.setAttribute('data-status', checks <= 2 ? 'danger' : checks <= 4 ? 'warning' : 'success');
}

function showMfeApproach(approach) {
  const box = document.getElementById('mfe-approach-box');
  if (!box) return;
  const info = {
    pt: {
      build: '<strong>Build-time Integration (Pacotes NPM):</strong><br>• <strong>Vantagem:</strong> Gera um bundle único otimizado sem duplicar dependências.<br>• <strong>Desvantagem Crítica:</strong> Viola o deploy independente; qualquer alteração exige recompilar e republicar a aplicação inteira.',
      iframe: '<strong>Run-time via iframes:</strong><br>• <strong>Vantagem:</strong> Isolamento máximo de estilos CSS e variáveis globais.<br>• <strong>Desvantagem Crítica:</strong> Dificulta roteamento, acessibilidade, responsividade e compartilhamento de estado na interface.',
      js: '<strong>Run-time via JavaScript / Web Components:</strong><br>• <strong>Vantagem:</strong> Preserva o deploy independente real e permite integração fluida no navegador.<br>• <strong>Atenção na Gestão:</strong> Requer governança sobre tamanho do bundle e padronização de eventos entre squads.'
    },
    en: {
      build: '<strong>Build-time Integration (NPM packages):</strong><br>• <strong>Advantage:</strong> Produces one optimized bundle without duplicating dependencies.<br>• <strong>Critical drawback:</strong> Breaks independent deployment; any change requires rebuilding and republishing the entire application.',
      iframe: '<strong>Run-time via iframes:</strong><br>• <strong>Advantage:</strong> Maximum isolation of CSS styles and global variables.<br>• <strong>Critical drawback:</strong> Makes routing, accessibility, responsiveness, and shared state more difficult.',
      js: '<strong>Run-time via JavaScript / Web Components:</strong><br>• <strong>Advantage:</strong> Preserves true independent deployment and enables fluid browser integration.<br>• <strong>Management note:</strong> Requires bundle-size governance and standardized events between squads.'
    }
  };
  box.innerHTML = info[currentLang][approach];
  box.setAttribute('data-status', approach === 'iframe' ? 'warning' : approach === 'js' ? 'success' : '');
}

function runGuiSimulation() {
  const targetInput = document.getElementById('guiTarget');
  const actualInput = document.getElementById('guiActual');
  const output = document.getElementById('gui-sim-output');
  if (!targetInput || !actualInput || !output) return;
  const target = parseFloat(targetInput.value) || 0;
  const actual = parseFloat(actualInput.value) || 0;
  const variance = actual - target;
  const pct = target !== 0 ? (variance / target) * 100 : 0;
  let color = '#e6edf3';
  let statusText = currentLang === 'pt' ? 'Dentro da faixa normal' : 'Within the normal range';
  if (pct <= -10) {
    color = '#f85149';
    statusText = currentLang === 'pt' ? 'Alerta Vermelho (<= -10% da meta)' : 'Red Alert (<= -10% of target)';
  } else if (pct >= 5) {
    color = '#3fb950';
    statusText = currentLang === 'pt' ? 'Destaque Verde (>= +5% da meta)' : 'Green Highlight (>= +5% of target)';
  }
  const labels = currentLang === 'pt'
    ? ['Variância calculada', 'Define cor', 'Apenas aplica o texto e a cor recebidos, sem conter regra de cálculo.']
    : ['Calculated variance', 'Defines color', 'Only applies the received text and color; it contains no calculation rule.'];
  output.innerHTML = `<p><strong>Model (Domínio):</strong> ${labels[0]} = <strong>${variance.toFixed(1)} (${pct.toFixed(1)}%)</strong></p><p><strong>Presentation Model / Presenter:</strong> ${labels[1]} <span style="color:${color};font-weight:700">${statusText}</span></p><p><strong>Humble View:</strong> ${labels[2]}</p>`;
  output.setAttribute('data-status', pct <= -10 ? 'danger' : pct >= 5 ? 'success' : 'warning');
}

function refreshDynamicOutput() {
  const activeScenario = document.querySelector('.scenario-card.active');
  if (activeScenario) simulateScenario(activeScenario.dataset.scenario);
  if (document.querySelector('.ms-check')) evaluateMsReadiness();
  runGuiSimulation();
}

window.addEventListener('click', event => {
  if (event.target.classList.contains('modal-overlay')) closeModal(event.target.id);
});

window.addEventListener('keydown', event => {
  if (event.key === 'Escape' && activeModal) closeModal(activeModal.id);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-overlay').forEach(modal => modal.setAttribute('aria-hidden', 'true'));
  applyStaticTranslations();
});
