export async function getScamBriefs() {
  return [
    {
      id: "1",
      title: "Fake Courier SMS Scam",
      summary: "Users receive fake delivery failure messages.",
      howItWorks:
        "Scammers send SMS with urgent delivery alerts containing malicious links.",
      staySafe:
        "Avoid clicking SMS links. Open courier apps manually.",
      riskLevel: "Medium",
      scamType: "Phishing",
    },
    {
      id: "2",
      title: "Crypto Wallet Approval Scam",
      summary: "Fake wallet sites drain crypto funds.",
      howItWorks:
        "Users are tricked into signing malicious blockchain approvals.",
      staySafe:
        "Never approve transactions from unknown sites.",
      riskLevel: "High",
      scamType: "Crypto Scam",
    },
  ];
}
