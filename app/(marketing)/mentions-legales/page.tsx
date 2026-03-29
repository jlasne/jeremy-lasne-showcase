"use client";

import Link from "next/link";

export default function MentionsLegalesPage() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 20px 80px", color: "#e8e6e1" }}>
      <Link href="/" style={{ fontSize: 13, color: "#5a5750", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>
        ← Retour
      </Link>

      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "#c9a84c" }}>Mentions légales</h1>
      <p style={{ fontSize: 13, color: "#5a5750", marginBottom: 40 }}>Dernière mise à jour : mars 2026</p>

      <Section title="1. Éditeur du site">
        <p>Nom : Jérémy Lasne</p>
        <p>Statut : Micro-entrepreneur</p>
        <p>SIRET : 93371057600010</p>
        <p>Adresse : Mercurol-Veaunes, France</p>
        <p>Email : <a href="mailto:hey@jeremylasne.com" style={{ color: "#c9a84c", textDecoration: "none" }}>hey@jeremylasne.com</a></p>
        <p>Téléphone : +33 6 73 83 55 29</p>
      </Section>

      <Section title="2. Hébergement">
        <p>Le site finance.jeremylasne.com est hébergé par :</p>
        <p>Vercel Inc.</p>
        <p>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
        <p>Site : vercel.com</p>
      </Section>

      <Section title="3. Activité">
        <p>
          Jérémy Lasne exerce une activité de conseil en architecture patrimoniale.
          Cette activité ne constitue pas du conseil en investissements financiers (CIF)
          au sens de l'article L. 541-1 du Code monétaire et financier, sauf mention
          contraire explicite et enregistrement auprès de l'ORIAS.
        </p>
      </Section>

      <Section title="4. Propriété intellectuelle">
        <p>
          L'ensemble des contenus présents sur ce site (textes, images, graphismes, logo,
          icônes, etc.) est protégé par les lois françaises et internationales relatives à
          la propriété intellectuelle. Toute reproduction, représentation, modification ou
          exploitation, totale ou partielle, sans autorisation écrite préalable de Jérémy Lasne,
          est strictement interdite.
        </p>
      </Section>

      <Section title="5. Données personnelles & RGPD">
        <p>
          Les données personnelles collectées via ce site (formulaires, espace client) sont
          traitées conformément au Règlement Général sur la Protection des Données (RGPD).
        </p>
        <p>Responsable du traitement : Jérémy Lasne</p>
        <p>Finalités : gestion de la relation client, envoi de documents, suivi des rendez-vous et paiements.</p>
        <p>Base légale : exécution contractuelle et consentement.</p>
        <p>Durée de conservation : 3 ans après la fin de la relation contractuelle.</p>
        <p>
          Conformément à la loi « Informatique et Libertés » et au RGPD, vous disposez d'un
          droit d'accès, de rectification, de suppression et de portabilité de vos données.
          Pour exercer ces droits, contactez : <a href="mailto:hey@jeremylasne.com" style={{ color: "#c9a84c", textDecoration: "none" }}>hey@jeremylasne.com</a>.
        </p>
      </Section>

      <Section title="6. Cookies">
        <p>
          Ce site utilise des cookies strictement nécessaires au fonctionnement technique
          (authentification, préférences de langue). Aucun cookie publicitaire ou de tracking
          tiers n'est utilisé.
        </p>
      </Section>

      <Section title="7. Responsabilité">
        <p>
          Les informations fournies sur ce site le sont à titre indicatif. Jérémy Lasne ne
          saurait être tenu responsable des décisions prises sur la base de ces informations.
          Tout investissement comporte des risques, y compris un risque de perte en capital.
        </p>
      </Section>

      <Section title="8. Médiation">
        <p>
          En cas de litige, le client peut recourir gratuitement au médiateur de la consommation :
        </p>
        <p>Nom du médiateur : CM2C — Centre de la Médiation de la Consommation de Conciliateurs de Justice</p>
        <p>Adresse : 49 rue de Ponthieu, 75008 Paris</p>
        <p>Site : www.cm2c.net</p>
        <p style={{ marginTop: 8, fontSize: 13, color: "#5a5750" }}>
          Conformément à l'article L. 612-1 du Code de la consommation.
        </p>
      </Section>

      <Section title="9. Droit applicable">
        <p>
          Les présentes mentions légales sont soumises au droit français. En cas de litige,
          le tribunal compétent sera celui du domicile du consommateur.
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
