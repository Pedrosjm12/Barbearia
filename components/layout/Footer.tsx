import { endereco } from "@/data/agenda";
import { photos } from "@/data/photos";

const autores = [...new Map(Object.values(photos).map((p) => [p.author, p.unsplashId])).entries()];

export function Footer() {
  return (
    <footer className="border-t border-tb-cream/10 bg-tb-black">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-3 md:px-8">
        <div>
          <p className="text-2xl font-black">
            Talentos <span className="text-tb-red">Black</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-[1.5] text-tb-cream/70">
            A barbearia do bairro que virou referência em Uberlândia.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">Onde estamos</h2>
          <address className="mt-4 text-sm leading-[1.5] text-tb-cream/70 not-italic">
            {endereco.rua}
            <br />
            {endereco.bairro}
            <br />
            {endereco.cidade}
            <br />
            WhatsApp <span className="font-mono">{endereco.whatsapp}</span>
          </address>
        </div>

        <div>
          <h2 className="text-lg font-bold">Horário</h2>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm text-tb-cream/70">
            <dt>Ter a sex</dt>
            <dd className="font-mono">09:00 – 19:00</dd>
            <dt>Sábado</dt>
            <dd className="font-mono">09:00 – 19:00</dd>
            <dt>Dom e seg</dt>
            <dd>Fechado</dd>
          </dl>
        </div>
      </div>

      <div className="border-t border-tb-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-tb-cream/60 md:flex-row md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Talentos Black. Todos os direitos reservados.</p>
          <details className="group md:text-right">
            <summary className="cursor-pointer underline underline-offset-4 hover:text-tb-cream">
              Créditos das fotos (Unsplash)
            </summary>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 md:justify-end">
              {autores.map(([autor, id]) => (
                <li key={id}>
                  <a
                    href={`https://unsplash.com/photos/${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-tb-cream"
                  >
                    {autor}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </footer>
  );
}
