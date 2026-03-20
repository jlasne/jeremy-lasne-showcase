"use client";

import Link from "next/link";

export default function CGVPage() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 20px 80px", color: "#e8e6e1" }}>
      <Link href="/" style={{ fontSize: 13, color: "#5a5750", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>
        ← Retour
      </Link>

      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "#c9a84c" }}>Conditions Générales de Vente</h1>
      <p style={{ fontSize: 13, color: "#5a5750", marginBottom: 40 }}>Dernière mise à jour : mars 2026</p>

      <Section title="Article 1 — Objet">
        <p>
          Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles
          entre Jérémy Lasne, exerçant sous le statut de micro-entrepreneur (SIRET : 93371057600010), et tout client (ci-après
          « le Client ») souscrivant à ses prestations de conseil en architecture patrimoniale.
        </p>
      </Section>

      <Section title="Article 2 — Prestations">
        <p>Les prestations proposées incluent, sans s'y limiter :</p>
        <ul style={{ paddingLeft: 20, margin: "8px 0" }}>
          <li>Audit patrimonial personnalisé</li>
          <li>Conseil en structuration et optimisation patrimoniale</li>
          <li>Accompagnement stratégique sur les classes d'actifs (immobilier, marchés financiers, actifs numériques, private equity)</li>
          <li>Suivi régulier et ajustements</li>
        </ul>
        <p>Le périmètre exact de chaque mission est défini dans le contrat signé entre les parties.</p>
      </Section>

      <Section title="Article 3 — Tarifs et modalités de paiement">
        <p>Les tarifs sont communiqués au Client avant toute engagement et figurent dans le contrat de mission.</p>
        <p>Moyens de paiement acceptés : virement bancaire, carte bancaire (via Stripe).</p>
        <p>Conditions de paiement : premier paiement à la signature du contrat : 1 500 € (audit 1 200 € + première revue trimestrielle 300 €). Les revues trimestrielles suivantes sont facturées à 300 € chacune, en début de trimestre.</p>
        <p>Les prestations sont exonérées de TVA en vertu de l'article 293 B du CGI.</p>
        <p>
          En cas de retard de paiement, des pénalités de retard seront appliquées au taux
          légal en vigueur, conformément à l'article L. 441-10 du Code de commerce.
        </p>
      </Section>

      <Section title="Article 4 — Durée et résiliation">
        <p>
          La durée de la mission est définie dans le contrat. Chaque partie peut résilier
          le contrat moyennant un préavis de 30 jours par courrier
          ou email à <a href="mailto:hey@jeremylasne.com" style={{ color: "#c9a84c", textDecoration: "none" }}>hey@jeremylasne.com</a>.
        </p>
        <p>
          En cas de résiliation anticipée par le Client, les prestations déjà réalisées
          restent dues.
        </p>
      </Section>

      <Section title="Article 5 — Obligations du prestataire">
        <p>
          Jérémy Lasne s'engage à fournir ses prestations avec diligence et professionnalisme.
          Il est soumis à une obligation de moyens et non de résultat. Les recommandations
          formulées ne constituent en aucun cas une garantie de performance financière.
        </p>
      </Section>

      <Section title="Article 6 — Obligations du Client">
        <p>Le Client s'engage à :</p>
        <ul style={{ paddingLeft: 20, margin: "8px 0" }}>
          <li>Fournir des informations exactes et complètes</li>
          <li>Régler les prestations dans les délais convenus</li>
          <li>Respecter la confidentialité des échanges et documents partagés</li>
        </ul>
      </Section>

      <Section title="Article 7 — Confidentialité">
        <p>
          L'ensemble des informations échangées entre Jérémy Lasne et le Client sont
          strictement confidentielles. Aucune information ne sera transmise à des tiers
          sans accord écrit préalable du Client, sauf obligation légale.
        </p>
      </Section>

      <Section title="Article 8 — Responsabilité">
        <p>
          Jérémy Lasne ne pourra être tenu responsable des pertes financières résultant
          des décisions d'investissement prises par le Client, même si celles-ci s'appuient
          sur les recommandations formulées dans le cadre de la mission.
        </p>
      </Section>

      <Section title="Article 9 — Droit de rétractation">
        <p>
          Conformément à l'article L. 221-28 du Code de la consommation, le droit de
          rétractation ne s'applique pas aux prestations de services pleinement exécutées
          avant la fin du délai de rétractation et dont l'exécution a commencé avec l'accord
          préalable du Client.
        </p>
        <p>
          Pour les prestations non encore commencées, le Client dispose d'un délai de
          14 jours à compter de la signature du contrat pour exercer son droit de rétractation.
        </p>
      </Section>

      <Section title="Article 10 — Médiation">
        <p>
          En cas de litige, le Client peut recourir gratuitement au médiateur de la consommation :
        </p>
        <p>Nom du médiateur : CM2C — Centre de la Médiation de la Consommation de Conciliateurs de Justice</p>
        <p>Adresse : 49 rue de Ponthieu, 75008 Paris</p>
        <p>Site : www.cm2c.net</p>
      </Section>

      <Section title="Article 11 — Droit applicable">
        <p>
          Les présentes CGV sont soumises au droit français. Tout litige sera soumis
          aux tribunaux compétents du ressort du domicile du consommateur.
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 12, color: "#e8e6e1" }}>{title}</h2>
      <div style={{ fontSize: 14, lineHeight: 1.7, color: "#9a9790", display: "flex", flexDirection: "column", gap: 6 }}>
        {children}
      </div>
    </div>
  );
}
