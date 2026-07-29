# 📊 Analyse du jeu de données UCI Online Retail

Ce document simule un notebook Jupyter pour l'analyse des transactions d'une boutique en ligne britannique.

## 1. Chargement et Échantillonnage
Nous avons chargé les données depuis `ucimlrepo` et extrait un échantillon aléatoire de 10% (seed=42) pour l'optimisation.
- **Taille de l'échantillon** : 541909 lignes brutes → 54191 lignes échantillonnées.

```python
import pandas as pd
from ucimlrepo import fetch_ucirepo

# Chargement
online_retail = fetch_ucirepo(id=352)
df = online_retail.data.original

# Échantillonnage 10%
df_sample = df.sample(frac=0.1, random_state=42).copy()
```

## 2. Nettoyage Approfondi
Les données transactionnelles réelles sont souvent bruitées.

```python
# Suppression des clients inconnus
df_sample = df_sample.dropna(subset=['CustomerID'])

# Gestion des types
df_sample['InvoiceDate'] = pd.to_datetime(df_sample['InvoiceDate'], errors='coerce')
df_sample['InvoiceNo'] = df_sample['InvoiceNo'].astype(str)

# Nettoyage textuel
df_sample['Description'] = df_sample['Description'].str.strip().str.upper()
```

### 💡 Comprendre les Anomalies (Logique Métier)
Nous observons des quantités négatives et des prix unitaires à 0.
- **Quantités négatives** : Ce sont généralement des retours ou des annulations (les factures commencent souvent par 'C' pour Cancelled).
- **Prix à 0** : Il s'agit d'échantillons gratuits, de cadeaux de fidélité ou d'ajustements comptables.

*Pourquoi ne pas simplement les supprimer ?* 
Si nous supprimons les retours, le chiffre d'affaires total sera artificiellement gonflé. En gardant les retours (quantités négatives), la multiplication `Quantity * UnitPrice` donne un revenu négatif qui, lorsqu'il est sommé, soustrait correctement les remboursements du revenu brut pour obtenir le **revenu net**.

## 3. Création des Indicateurs

```python
# Création de la colonne Revenue
df_sample['Revenue'] = df_sample['Quantity'] * df_sample['UnitPrice']
```
**Statistiques du Revenu (Échantillon) :**
- Moyenne : $22.04
- Min (Remboursements) : $-2118.74
- Max : $77183.60

## 4. Analyse par Pays (Top 10)

```python
country_revenue = df_sample.groupby('Country')['Revenue'].sum().reset_index()
top_10 = country_revenue.sort_values(by='Revenue', ascending=False).head(10)
```

Voici les données du Top 10 :
| Country | Revenue |
|---------|---------|
| United Kingdom | $749,001.70 |
| Netherlands | $27,435.83 |
| EIRE | $23,759.11 |
| France | $23,168.92 |
| Germany | $21,653.30 |
| Australia | $12,421.03 |
| Spain | $5,575.40 |
| Switzerland | $5,375.69 |
| Belgium | $3,582.51 |
| Portugal | $3,199.31 |

## 5. Visualisation

Le graphique a été généré via notre tableau de bord interactif. Le Royaume-Uni (United Kingdom) domine largement les ventes, ce qui est logique pour une boutique britannique.

## 6. Piste d'amélioration
Pour analyser le comportement client (`CustomerID`) en tenant compte des retours, il faudrait :
1. Identifier les paires (Achat, Retour) en croisant les montants et les ID clients.
2. Calculer un indicateur de "Taux de retour" par client.
3. Segmenter les clients (ex: RFM) en utilisant uniquement le **Revenu Net Client** plutôt que le volume brut.
