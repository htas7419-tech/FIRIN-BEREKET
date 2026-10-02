<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fırın Bereket - Yönetim ve Otomasyon Sistemi</title>
    <style>
        :root {
            --primary-color: #1e293b;
            --secondary-color: #0f172a;
            --accent-color: #2563eb;
            --success-color: #16a34a;
            --warning-color: #d97706;
            --danger-color: #dc2626;
            --bg-color: #f8fafc;
            --card-bg: #ffffff;
            --border-color: #e2e8f0;
            --text-main: #334155;
            --text-muted: #64748b;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-main);
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 20px;
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .header h1 {
            font-size: 24px;
            font-weight: 700;
        }

        .header .date-badge {
            background: rgba(255, 255, 255, 0.15);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
        }

        /* Ekran Üst Kontrol Paneli */
        .screen-control-bar {
            background: #f1f5f9;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 12px 15px;
            margin-bottom: 20px;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            align-items: center;
            justify-content: space-between;
        }

        .control-group {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .control-group label {
            font-size: 13px;
            font-weight: 700;
            color: var(--primary-color);
        }

        /* Navigasyon Sekmeleri */
        .nav-tabs {
            display: flex;
            gap: 8px;
            overflow-x: auto;
            padding-bottom: 5px;
            border-bottom: 2px solid var(--border-color);
        }

        .tab-btn {
            background: white;
            border: 1px solid var(--border-color);
            padding: 10px 18px;
            border-radius: 8px 8px 0 0;
            font-weight: 600;
            font-size: 13px;
            color: var(--text-muted);
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
        }

        .tab-btn:hover {
            background: #f1f5f9;
            color: var(--primary-color);
        }

        .tab-btn.active {
            background: var(--accent-color);
            color: white;
            border-color: var(--accent-color);
        }

        /* Ekran İçerikleri */
        .tab-content {
            display: none;
            background: var(--card-bg);
            padding: 20px;
            border-radius: 0 0 12px 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            border: 1px solid var(--border-color);
        }

        .tab-content.active {
            display: block;
        }

        /* Tablo Stilleri */
        .table-responsive {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            font-size: 14px;
        }

        th, td {
            padding: 10px 12px;
            border: 1px solid var(--border-color);
            text-align: left;
        }

        th {
            background-color: #f1f5f9;
            color: var(--primary-color);
            font-weight: 700;
            font-size: 13px;
            text-transform: uppercase;
        }

        tr:nth-child(even) {
            background-color: #f8fafc;
        }

        input[type="number"], input[type="text"], input[type="date"], select {
            width: 100%;
            padding: 6px 10px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-size: 14px;
            outline: none;
            transition: border 0.2s;
        }

        input[type="number"]:focus, input[type="text"]:focus, select:focus {
            border-color: var(--accent-color);
        }

        .btn {
            background-color: var(--accent-color);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            font-size: 13px;
            transition: background 0.2s;
        }

        .btn:hover {
            opacity: 0.9;
        }

        .btn-success { background-color: var(--success-color); }
        .btn-warning { background-color: var(--warning-color); }
        .btn-danger {
            background-color: var(--danger-color);
            padding: 4px 8px;
            font-size: 12px;
        }

        /* Kartlar ve Kasa Özeti */
        .kasa-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }

        .kasa-card {
            background: #f8fafc;
            border: 1px solid var(--border-color);
            padding: 15px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        .kasa-card .title {
            font-size: 12px;
            font-weight: 700;
            color: var(--text-muted);
            text-transform: uppercase;
        }

        .kasa-card .value {
            font-size: 20px;
            font-weight: 800;
            color: var(--primary-color);
        }

        .status-positive { color: var(--success-color); font-weight: bold; }
        .status-negative { color: var(--danger-color); font-weight: bold; }
        .status-neutral { color: var(--text-muted); font-weight: bold; }

        .info-note {
            background-color: #eff6ff;
            border-left: 4px solid var(--accent-color);
            padding: 12px;
            border-radius: 4px;
            font-size: 13px;
            margin-top: 15px;
            color: #1e40af;
        }
    </style>
</head>
<body>

<div class="header">
    <div>
        <h1>Fırın Bereket - Yönetim Portalı</h1>
        <small style="opacity: 0.8;">Tüm Ekranlar & Canlı Üretim-Satış-Kasa Raporlama Sistemi</small>
    </div>
    <div class="date-badge">
        Sistem Tarihi: <input type="date" id="sistemTarihi" style="background:transparent; border:none; color:white; font-weight:bold;">
    </div>
</div>

<!-- Navigasyon Sekmeleri (9 Ekran) -->
<div class="nav-tabs">
    <button class="tab-btn active" onclick="ekranDegistir('ekran9')">📊 9. RAPOR & KASA</button>
    <button class="tab-btn" onclick="ekranDegistir('ekran1')">🏷️ 1. Fiyatlar</button>
    <button class="tab-btn" onclick="ekranDegistir('ekran2')">👥 2. Personel</button>
    <button class="tab-btn" onclick="ekranDegistir('ekran3')">📋 3. Puantaj</button>
    <button class="tab-btn" onclick="ekranDegistir('ekran4')">📦 4. Stok</button>
    <button class="tab-btn" onclick="ekranDegistir('ekran5')">🥖 5. Üretim</button>
    <button class="tab-btn" onclick="ekranDegistir('ekran6')">🏪 6. İç Satış</button>
    <button class="tab-btn" onclick="ekranDegistir('ekran7')">🛒 7. Bakkallar</button>
    <button class="tab-btn" onclick="ekranDegistir('ekran8')">🏬 8. BİM Satış</button>
</div>

<!-- 9. EKRAN: RAPOR & KASA -->
<div id="ekran9" class="tab-content active">
    <div class="screen-control-bar">
        <div class="control-group">
            <label>Rapor Tarihi:</label>
            <input type="date" id="tarih_ekran9" onchange="tarihEslestir(this.value)">
        </div>
        <div class="control-group">
            <label>Bölüm / Şube:</label>
            <select id="bolum_ekran9" style="width: 180px;">
                <option value="TUMU">Tüm Bölümler</option>
                <option value="MERKEZ">Merkez Fırın</option>
                <option value="SUBE_1">Şube 1</option>
                <option value="SUBE_2">Şube 2</option>
            </select>
        </div>
        <div>
            <button class="btn btn-success" onclick="ekranVerisiKaydet(9)">💾 9. Ekran Verilerini Kaydet</button>
            <button class="btn btn-warning" onclick="gecmisYedekIndir()">📥 Tüm Yedeği Indir (JSON)</button>
            <input type="file" id="yedekYukleInput" style="display:none" onchange="gecmisYedekYukle(event)" accept=".json">
            <button class="btn" style="background:#475569;" onclick="document.getElementById('yedekYukleInput').click()">📤 Yedeği Geri Yükle</button>
        </div>
    </div>

    <h3>Günlük Kasa & Finans Özeti</h3>
    <div class="kasa-grid" style="margin-top:10px;">
        <div class="kasa-card">
            <span class="title">Merkez Satış Ciro</span>
            <span class="value" id="kasaMerkezCiro">0 TL</span>
        </div>
        <div class="kasa-card">
            <span class="title">Gelen Personel Yevmiyeleri</span>
            <span class="value" id="kasaYevmiyeTop">0 TL</span>
        </div>
        <div class="kasa-card">
            <span class="title">Diğer Giderler</span>
            <input type="number" id="digerGiderler" value="0" min="0" oninput="hesaplaHepsini()" style="font-size:16px; font-weight:bold;">
        </div>
        <div class="kasa-card" style="background:#f0fdf4; border-color:#bbf7d0;">
            <span class="title" style="color:#166534;">Net Günlük Kasa</span>
            <span class="value" id="kasaNetGünluk" style="color:#15803d;">0 TL</span>
        </div>
    </div>

    <h3 style="margin-top:25px;">Üretim - Satış - İade (Fark) Raporu</h3>
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th>Ürün Adı</th>
                    <th>Üretim Miktarı</th>
                    <th>Satılan Toplam (İç+Bakkal+BİM+Pers.)</th>
                    <th>Atılan (Merkez)</th>
                    <th>Kalan (Merkez)</th>
                    <th>Fark (Sonuç)</th>
                    <th>Durum</th>
                </tr>
            </thead>
            <tbody id="raporGövde">
                <!-- JS dolduracak -->
            </tbody>
        </table>
    </div>

    <div class="info-note">
        <strong>💡 Otomatik Hesaplama Kuralları:</strong><br>
        • <strong>Ekmek Satılan:</strong> Merkez Satılan + Şube Satılan + Bakkallar + BİM Ekmek + (BİM Büyük Ekmek × 2) + BİM Simit Ekmek + (Gelen Personel Sayısı × 5 Ekmek)<br>
        • <strong>Üretim Çarpanları:</strong> Ekmek (Araba × 120), Pide/Tandır/İçli (Pasa × 20), Diğer Ürünler (Adet × 1)<br>
        • <strong>Fark:</strong> Üretim Miktarı - (Satılan + Atılan + Kalan)
    </div>
</div>

<!-- 1. EKRAN: FİYATLAR (Kalıcı Hafıza Dahil Edildi) -->
<div id="ekran1" class="tab-content">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <div>
            <h3>1. Ekran - Ürün Birim Fiyatları (TL)</h3>
            <p style="font-size:13px; color:var(--text-muted);">Değişiklikler anında otomatik kaydedilir ve program kapatılsa bile korunur.</p>
        </div>
        <button class="btn btn-warning" onclick="fiyatlariSifirla()">🔄 Fiyatları Varsayılana Sıfırla</button>
    </div>
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th>Ürün Adı</th>
                    <th>Merkez (TL)</th>
                    <th>Şube (TL)</th>
                    <th>Dış Satış (TL)</th>
                    <th>TOKİ (TL)</th>
                    <th>KUL Market (TL)</th>
                </tr>
            </thead>
            <tbody id="fiyatTablo">
                <!-- JS dinamik -->
            </tbody>
        </table>
    </div>
</div>

<!-- 2. EKRAN: PERSONEL -->
<div id="ekran2" class="tab-content">
    <h3>2. Ekran - Personel Listesi ve Yevmiyeler</h3>
    <div class="table-responsive">
        <table style="max-width: 600px;">
            <thead>
                <tr>
                    <th>Personel Adı</th>
                    <th>Günlük Yevmiye (TL)</th>
                    <th>İşlem</th>
                </tr>
            </thead>
            <tbody id="personelTablo">
                <!-- JS dinamik -->
            </tbody>
        </table>
    </div>
    <button class="btn" style="margin-top:10px;" onclick="personelEkle()">+ Yeni Personel Ekle</button>
</div>

<!-- 3. EKRAN: PUANTAJ -->
<div id="ekran3" class="tab-content">
    <div class="screen-control-bar">
        <div class="control-group">
            <label>Puantaj Tarihi:</label>
            <input type="date" id="tarih_ekran3" onchange="tarihEslestir(this.value)">
        </div>
        <div class="control-group">
            <label>Bölüm:</label>
            <select id="bolum_ekran3">
                <option value="ÜRETİM">Üretim Vardiyası</option>
                <option value="TEZGAH">Tezgah / Satış</option>
                <option value="SEVKİYAT">Sevkiyat / Dağıtım</option>
            </select>
        </div>
        <button class="btn btn-success" onclick="ekranVerisiKaydet(3)">💾 3. Ekran Verilerini Kaydet</button>
    </div>

    <h3>3. Ekran - Personel Günlük Puantajı</h3>
    <p style="font-size:13px; color:var(--text-muted); margin-bottom:10px;">Geldi işaretlenen personellerin yevmiyeleri kasadan düşülür ve kişi başı 5 ekmek satışa eklenir.</p>
    <div class="table-responsive">
        <table style="max-width: 600px;">
            <thead>
                <tr>
                    <th>Personel Adı</th>
                    <th>Durumu (Geldi mi?)</th>
                </tr>
            </thead>
            <tbody id="puantajTablo">
                <!-- JS dinamik -->
            </tbody>
        </table>
    </div>
</div>

<!-- 4. EKRAN: STOK -->
<div id="ekran4" class="tab-content">
    <div class="screen-control-bar">
        <div class="control-group">
            <label>Stok Tarihi:</label>
            <input type="date" id="tarih_ekran4" onchange="tarihEslestir(this.value)">
        </div>
        <div class="control-group">
            <label>Bölüm / Depo:</label>
            <select id="bolum_ekran4">
                <option value="ANA_DEPO">Ana Un Deposu</option>
                <option value="KAT_DEPO">Kat/Üretim Deposu</option>
            </select>
        </div>
        <button class="btn btn-success" onclick="ekranVerisiKaydet(4)">💾 4. Ekran Verilerini Kaydet</button>
    </div>

    <h3>4. Ekran - Hammadde & Stok Takibi</h3>
    <div class="kasa-grid" style="margin-top:10px;">
        <div class="kasa-card">
            <span class="title">Toplam Alım</span>
            <input type="number" id="stokAlim" value="0" min="0" oninput="hesaplaHepsini()">
        </div>
        <div class="kasa-card">
            <span class="title">Toplam Tüketim</span>
            <input type="number" id="stokTuketim" value="0" min="0" oninput="hesaplaHepsini()">
        </div>
        <div class="kasa-card">
            <span class="title">Kalan Stok Durumu</span>
            <span class="value" id="stokKalan">0</span>
        </div>
    </div>
</div>

<!-- 5. EKRAN: ÜRETİM -->
<div id="ekran5" class="tab-content">
    <div class="screen-control-bar">
        <div class="control-group">
            <label>Üretim Tarihi:</label>
            <input type="date" id="tarih_ekran5" onchange="tarihEslestir(this.value)">
        </div>
        <div class="control-group">
            <label>Üretim Bölümü:</label>
            <select id="bolum_ekran5">
                <option value="Ekmek Fırını">Ekmek Fırını (1. Fırın)</option>
                <option value="Pide/Tandır Fırını">Pide & Tandır Fırını (2. Fırın)</option>
                <option value="Unlu Mamüller">Unlu Mamüller Bölümü</option>
            </select>
        </div>
        <button class="btn btn-success" onclick="ekranVerisiKaydet(5)">💾 5. Ekran Verilerini Kaydet</button>
    </div>

    <h3>5. Ekran - Günlük Üretim Girişi</h3>
    <div class="table-responsive">
        <table style="max-width: 700px;">
            <thead>
                <tr>
                    <th>Ürün Adı</th>
                    <th>Miktar</th>
                    <th>Birim</th>
                    <th>Hesaplanan Toplam Adet</th>
                </tr>
            </thead>
            <tbody id="uretimTablo">
                <!-- JS dinamik -->
            </tbody>
        </table>
    </div>
</div>

<!-- 6. EKRAN: İÇ SATIŞ -->
<div id="ekran6" class="tab-content">
    <div class="screen-control-bar">
        <div class="control-group">
            <label>Satış Tarihi:</label>
            <input type="date" id="tarih_ekran6" onchange="tarihEslestir(this.value)">
        </div>
        <div class="control-group">
            <label>Satış Bölümü:</label>
            <select id="bolum_ekran6">
                <option value="MERKEZ_TEZGAH">Merkez Tezgah</option>
                <option value="SUBE_TEZGAH">Şube Tezgah</option>
            </select>
        </div>
        <button class="btn btn-success" onclick="ekranVerisiKaydet(6)">💾 6. Ekran Verilerini Kaydet</button>
    </div>

    <h3>6. Ekran - İç Satış (Merkez & Şube)</h3>
    <h4 style="margin-top:10px; color:var(--accent-color);">A) MERKEZ SATIŞ</h4>
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th>Ürün Adı</th>
                    <th>Satılan Adet</th>
                    <th>Atılan Adet</th>
                    <th>Kalan Adet</th>
                </tr>
            </thead>
            <tbody id="merkezSatisTablo">
                <!-- JS dinamik -->
            </tbody>
        </table>
    </div>

    <h4 style="margin-top:20px; color:var(--accent-color);">B) ŞUBE SATIŞ</h4>
    <div class="table-responsive">
        <table style="max-width: 600px;">
            <thead>
                <tr>
                    <th>Ürün Adı</th>
                    <th>Satılan Adet</th>
                </tr>
            </thead>
            <tbody id="subeSatisTablo">
                <!-- JS dinamik -->
            </tbody>
        </table>
    </div>
</div>

<!-- 7. EKRAN: BAKKALLAR -->
<div id="ekran7" class="tab-content">
    <div class="screen-control-bar">
        <div class="control-group">
            <label>Sevkiyat Tarihi:</label>
            <input type="date" id="tarih_ekran7" onchange="tarihEslestir(this.value)">
        </div>
        <div class="control-group">
            <label>Dağıtım Bölgesi:</label>
            <select id="bolum_ekran7">
                <option value="MERKEZ_ROTA">Merkez Rota / Şehir İçi</option>
                <option value="DIS_ROTA">Dış Rota / Çevre Beldeler</option>
            </select>
        </div>
        <button class="btn btn-success" onclick="ekranVerisiKaydet(7)">💾 7. Ekran Verilerini Kaydet</button>
    </div>

    <h3>7. Ekran - Bakkal / Market Dış Satışları</h3>
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th>Bakkal Adı</th>
                    <th>Ekmek</th>
                    <th>Tam Buğday</th>
                    <th>Pide</th>
                    <th>Tandır</th>
                    <th>Simit</th>
                    <th>Sandeviç</th>
                    <th>İşlem</th>
                </tr>
            </thead>
            <tbody id="bakkalTablo">
                <!-- JS dinamik -->
            </tbody>
        </table>
    </div>
    <button class="btn" style="margin-top:10px;" onclick="bakkalEkle()">+ Yeni Bakkal Ekle</button>
</div>

<!-- 8. EKRAN: BİM SATIŞ -->
<div id="ekran8" class="tab-content">
    <div class="screen-control-bar">
        <div class="control-group">
            <label>Teslimat Tarihi:</label>
            <input type="date" id="tarih_ekran8" onchange="tarihEslestir(this.value)">
        </div>
        <div class="control-group">
            <label>Tedarik Bölümü:</label>
            <select id="bolum_ekran8">
                <option value="BIM_BÖLGE_1">BİM - Ana Bölge Depo</option>
                <option value="BIM_MAĞAZALAR">BİM - Yerel Mağazalar</option>
            </select>
        </div>
        <button class="btn btn-success" onclick="ekranVerisiKaydet(8)">💾 8. Ekran Verilerini Kaydet</button>
    </div>

    <h3>8. Ekran - BİM Satış Girişleri</h3>
    <div class="table-responsive">
        <table style="max-width: 500px;">
            <thead>
                <tr>
                    <th>Ürün Adı</th>
                    <th>Satılan Miktar</th>
                    <th>Not / Çarpan Rule</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>EKMEK</strong></td>
                    <td><input type="number" class="bim-input" id="bim_Ekmek" value="0" min="0" oninput="hesaplaHepsini()"></td>
                    <td>1x Ekmek</td>
                </tr>
                <tr>
                    <td><strong>SİMİT EKMEK</strong></td>
                    <td><input type="number" class="bim-input" id="bim_SimitEkmek" value="0" min="0" oninput="hesaplaHepsini()"></td>
                    <td>1x Ekmek Hesabına Katılır</td>
                </tr>
                <tr>
                    <td><strong>BÜYÜK EKMEK</strong></td>
                    <td><input type="number" class="bim-input" id="bim_BuyukEkmek" value="0" min="0" oninput="hesaplaHepsini()"></td>
                    <td><strong>2x Ekmek</strong> Hesabına Katılır</td>
                </tr>
                <tr>
                    <td><strong>SİMİT</strong></td>
                    <td><input type="number" class="bim-input" id="bim_Simit" value="0" min="0" oninput="hesaplaHepsini()"></td>
                    <td>Simit Satışına Katılır</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<script>
    // Ürün Listesi ve Varsayılan Bilgiler
    const urunler = [
        { id: 'EKMEK', ad: 'EKMEK', birim: 'ARABA', carpan: 120 },
        { id: 'TAM_BUGDAY', ad: 'TAM BUĞDAY', birim: 'ADET', carpan: 1 },
        { id: 'PIDE', ad: 'PİDE', birim: 'PASA', carpan: 20 },
        { id: 'TANDIR', ad: 'TANDIR', birim: 'PASA', carpan: 20 },
        { id: 'SIMIT', ad: 'SİMİT', birim: 'ADET', carpan: 1 },
        { id: 'YAGLI', ad: 'YAĞLI', birim: 'ADET', carpan: 1 },
        { id: 'HASHASLI', ad: 'HAŞHAŞLI', birim: 'ADET', carpan: 1 },
        { id: 'ICLI', ad: 'İÇLİ', birim: 'PASA', carpan: 20 },
        { id: 'LAVAS', ad: 'LAVAŞ', birim: 'ADET', carpan: 1 },
        { id: 'SANDEVIC', ad: 'SANDEVİÇ', birim: 'ADET', carpan: 1 }
    ];

    // Varsayılan Fiyat Değerleri
    const varsayilanFiyatlar = {
        EKMEK: { merkez: 10, sube: 10, dis: 10, toki: 10, kul: 10 },
        TAM_BUGDAY: { merkez: 15, sube: 15, dis: 15, toki: 15, kul: 15 },
        PIDE: { merkez: 12, sube: 12, dis: 12, toki: 12, kul: 12 },
        TANDIR: { merkez: 12, sube: 12, dis: 12, toki: 12, kul: 12 },
        SIMIT: { merkez: 10, sube: 10, dis: 10, toki: 10, kul: 10 },
        YAGLI: { merkez: 15, sube: 15, dis: 15, toki: 15, kul: 15 },
        HASHASLI: { merkez: 15, sube: 15, dis: 15, toki: 15, kul: 15 },
        ICLI: { merkez: 20, sube: 20, dis: 20, toki: 20, kul: 20 },
        LAVAS: { merkez: 5, sube: 5, dis: 5, toki: 5, kul: 5 },
        SANDEVIC: { merkez: 8, sube: 8, dis: 8, toki: 8, kul: 8 }
    };

    let guncelFiyatlar = {};

    let personeller = [
        { ad: 'AHMET AK', yevmiye: 2500, geldi: true }
    ];

    let bakkallar = [
        'TOKİ', 'KUL MARKET', 'ASLAN', 'LEZZET', 'SOS', 'HACI BABA', 'BİRSAN', 'VİP', 'TAŞEL'
    ];

    // Tarih Senkronizasyonu
    function tarihEslestir(secilenTarih) {
        document.getElementById('sistemTarihi').value = secilenTarih;
        for (let i = 3; i <= 9; i++) {
            const el = document.getElementById(`tarih_ekran${i}`);
            if (el) el.value = secilenTarih;
        }
    }

    const bugun = new Date().toISOString().split('T')[0];
    document.getElementById('sistemTarihi').value = bugun;
    tarihEslestir(bugun);

    // --- FİYAT KAYDETME VE YÜKLEME ---
    function fiyatlariYukle() {
        const kayitli = localStorage.getItem('FirinKayıt_Fiyatlar');
        if (kayitli) {
            try {
                guncelFiyatlar = JSON.parse(kayitli);
            } catch(e) {
                guncelFiyatlar = JSON.parse(JSON.stringify(varsayilanFiyatlar));
            }
        } else {
            guncelFiyatlar = JSON.parse(JSON.stringify(varsayilanFiyatlar));
        }
    }

    function fiyatDegisti(urunId, alan, deger) {
        if (!guncelFiyatlar[urunId]) {
            guncelFiyatlar[urunId] = { merkez: 10, sube: 10, dis: 10, toki: 10, kul: 10 };
        }
        guncelFiyatlar[urunId][alan] = parseFloat(deger) || 0;
        localStorage.setItem('FirinKayıt_Fiyatlar', JSON.stringify(guncelFiyatlar));
        hesaplaHepsini();
    }

    function fiyatlariSifirla() {
        if (confirm('Tüm fiyatlar varsayılan değerlere sıfırlansın mı?')) {
            guncelFiyatlar = JSON.parse(JSON.stringify(varsayilanFiyatlar));
            localStorage.setItem('FirinKayıt_Fiyatlar', JSON.stringify(guncelFiyatlar));
            tabloOlustur();
            hesaplaHepsini();
        }
    }

    // Personel ve Bakkal Listelerini Hafızadan Yükle
    function dinamikVerileriYukle() {
        const pKayit = localStorage.getItem('FirinKayıt_Personeller');
        if (pKayit) {
            try { personeller = JSON.parse(pKayit); } catch(e){}
        }
        const bKayit = localStorage.getItem('FirinKayıt_Bakkallar');
        if (bKayit) {
            try { bakkallar = JSON.parse(bKayit); } catch(e){}
        }
    }

    function dinamikVerileriKaydet() {
        localStorage.setItem('FirinKayıt_Personeller', JSON.stringify(personeller));
        localStorage.setItem('FirinKayıt_Bakkallar', JSON.stringify(bakkallar));
    }

    // Tablo Başlatıcılar
    function tabloOlustur() {
        fiyatlariYukle();

        // 1. Fiyat Tablosu
        const fTbody = document.getElementById('fiyatTablo');
        fTbody.innerHTML = '';
        urunler.forEach(u => {
            const f = guncelFiyatlar[u.id] || { merkez: 10, sube: 10, dis: 10, toki: 10, kul: 10 };
            fTbody.innerHTML += `
                <tr>
                    <td><strong>${u.ad}</strong></td>
                    <td><input type="number" value="${f.merkez}" oninput="fiyatDegisti('${u.id}', 'merkez', this.value)"></td>
                    <td><input type="number" value="${f.sube}" oninput="fiyatDegisti('${u.id}', 'sube', this.value)"></td>
                    <td><input type="number" value="${f.dis}" oninput="fiyatDegisti('${u.id}', 'dis', this.value)"></td>
                    <td><input type="number" value="${f.toki}" oninput="fiyatDegisti('${u.id}', 'toki', this.value)"></td>
                    <td><input type="number" value="${f.kul}" oninput="fiyatDegisti('${u.id}', 'kul', this.value)"></td>
                </tr>`;
        });

        // 5. Üretim Tablosu
        const uTbody = document.getElementById('uretimTablo');
        uTbody.innerHTML = '';
        urunler.forEach(u => {
            uTbody.innerHTML += `
                <tr>
                    <td><strong>${u.ad}</strong></td>
                    <td><input type="number" id="uretim_input_${u.id}" value="0" min="0" oninput="hesaplaHepsini()"></td>
                    <td><span class="status-neutral">${u.birim} (${u.carpan}x)</span></td>
                    <td id="uretim_toplam_${u.id}">0</td>
                </tr>`;
        });

        // 6. İç Satış Tabloları
        const mSatisTbody = document.getElementById('merkezSatisTablo');
        const sSatisTbody = document.getElementById('subeSatisTablo');
        mSatisTbody.innerHTML = '';
        sSatisTbody.innerHTML = '';

        urunler.forEach(u => {
            mSatisTbody.innerHTML += `
                <tr>
                    <td><strong>${u.ad}</strong></td>
                    <td><input type="number" id="merkez_satilan_${u.id}" value="0" min="0" oninput="hesaplaHepsini()"></td>
                    <td><input type="number" id="merkez_atilan_${u.id}" value="0" min="0" oninput="hesaplaHepsini()"></td>
                    <td><input type="number" id="merkez_kalan_${u.id}" value="0" min="0" oninput="hesaplaHepsini()"></td>
                </tr>`;

            sSatisTbody.innerHTML += `
                <tr>
                    <td><strong>${u.ad}</strong></td>
                    <td><input type="number" id="sube_satilan_${u.id}" value="0" min="0" oninput="hesaplaHepsini()"></td>
                </tr>`;
        });

        personelTabloGuncelle();
        bakkalTabloGuncelle();
    }

    // Personel Yönetimi
    function personelTabloGuncelle() {
        const pTbody = document.getElementById('personelTablo');
        const puantajTbody = document.getElementById('puantajTablo');
        pTbody.innerHTML = '';
        puantajTbody.innerHTML = '';

        personeller.forEach((p, idx) => {
            pTbody.innerHTML += `
                <tr>
                    <td><input type="text" value="${p.ad}" onchange="personeller[${idx}].ad = this.value; dinamikVerileriKaydet(); hesaplaHepsini();"></td>
                    <td><input type="number" value="${p.yevmiye}" oninput="personeller[${idx}].yevmiye = parseFloat(this.value)||0; dinamikVerileriKaydet(); hesaplaHepsini();"></td>
                    <td><button class="btn btn-danger" onclick="personeller.splice(${idx},1); dinamikVerileriKaydet(); personelTabloGuncelle(); hesaplaHepsini();">Sil</button></td>
                </tr>`;

            puantajTbody.innerHTML += `
                <tr>
                    <td><strong>${p.ad}</strong></td>
                    <td>
                        <select onchange="personeller[${idx}].geldi = (this.value === 'EVET'); dinamikVerileriKaydet(); hesaplaHepsini();">
                            <option value="EVET" ${p.geldi ? 'selected' : ''}>EVET (GELDI)</option>
                            <option value="HAYIR" ${!p.geldi ? 'selected' : ''}>HAYIR (GELMEDI)</option>
                        </select>
                    </td>
                </tr>`;
        });
    }

    function personelEkle() {
        personeller.push({ ad: 'YENİ PERSONEL', yevmiye: 2000, geldi: true });
        dinamikVerileriKaydet();
        personelTabloGuncelle();
        hesaplaHepsini();
    }

    // Bakkal Yönetimi
    function bakkalTabloGuncelle() {
        const bTbody = document.getElementById('bakkalTablo');
        bTbody.innerHTML = '';

        bakkallar.forEach((b, idx) => {
            bTbody.innerHTML += `
                <tr>
                    <td><input type="text" value="${b}" onchange="bakkallar[${idx}]=this.value; dinamikVerileriKaydet();"></td>
                    <td><input type="number" class="bakkal_val" data-bakkal="${idx}" data-urun="EKMEK" value="0" min="0" oninput="hesaplaHepsini()"></td>
                    <td><input type="number" class="bakkal_val" data-bakkal="${idx}" data-urun="TAM_BUGDAY" value="0" min="0" oninput="hesaplaHepsini()"></td>
                    <td><input type="number" class="bakkal_val" data-bakkal="${idx}" data-urun="PIDE" value="0" min="0" oninput="hesaplaHepsini()"></td>
                    <td><input type="number" class="bakkal_val" data-bakkal="${idx}" data-urun="TANDIR" value="0" min="0" oninput="hesaplaHepsini()"></td>
                    <td><input type="number" class="bakkal_val" data-bakkal="${idx}" data-urun="SIMIT" value="0" min="0" oninput="hesaplaHepsini()"></td>
                    <td><input type="number" class="bakkal_val" data-bakkal="${idx}" data-urun="SANDEVIC" value="0" min="0" oninput="hesaplaHepsini()"></td>
                    <td><button class="btn btn-danger" onclick="bakkallar.splice(${idx},1); dinamikVerileriKaydet(); bakkalTabloGuncelle(); hesaplaHepsini();">Sil</button></td>
                </tr>`;
        });
    }

    function bakkalEkle() {
        bakkallar.push('YENİ MARKET');
        dinamikVerileriKaydet();
        bakkalTabloGuncelle();
        hesaplaHepsini();
    }

    // ANA HESAPLAMA MOTORU
    function hesaplaHepsini() {
        let uretimToplamlari = {};
        urunler.forEach(u => {
            const val = parseFloat(document.getElementById(`uretim_input_${u.id}`)?.value) || 0;
            const top = val * u.carpan;
            uretimToplamlari[u.id] = top;
            const el = document.getElementById(`uretim_toplam_${u.id}`);
            if (el) el.innerText = top + ' adet';
        });

        let gelenPersonelSayisi = 0;
        let yevmiyeToplami = 0;
        personeller.forEach(p => {
            if (p.geldi) {
                gelenPersonelSayisi++;
                yevmiyeToplami += p.yevmiye;
            }
        });

        const alim = parseFloat(document.getElementById('stokAlim').value) || 0;
        const tuketim = parseFloat(document.getElementById('stokTuketim').value) || 0;
        document.getElementById('stokKalan').innerText = (alim - tuketim);

        let bakkalToplamlari = { EKMEK: 0, TAM_BUGDAY: 0, PIDE: 0, TANDIR: 0, SIMIT: 0, SANDEVIC: 0 };
        document.querySelectorAll('.bakkal_val').forEach(inp => {
            const urun = inp.getAttribute('data-urun');
            const val = parseFloat(inp.value) || 0;
            if (bakkalToplamlari[urun] !== undefined) {
                bakkalToplamlari[urun] += val;
            }
        });

        const bimEkmek = parseFloat(document.getElementById('bim_Ekmek').value) || 0;
        const bimSimitEkmek = parseFloat(document.getElementById('bim_SimitEkmek').value) || 0;
        const bimBuyukEkmek = parseFloat(document.getElementById('bim_BuyukEkmek').value) || 0;
        const bimSimit = parseFloat(document.getElementById('bim_Simit').value) || 0;

        const bimEkmekToplamKatki = bimEkmek + (bimBuyukEkmek * 2) + bimSimitEkmek;
        const personelEkmekEkstra = gelenPersonelSayisi * 5;

        const rTbody = document.getElementById('raporGövde');
        rTbody.innerHTML = '';

        let merkezCiroToplam = 0;

        urunler.forEach(u => {
            const uretimMiktar = uretimToplamlari[u.id] || 0;
            const mSatilan = parseFloat(document.getElementById(`merkez_satilan_${u.id}`)?.value) || 0;
            const mAtilan = parseFloat(document.getElementById(`merkez_atilan_${u.id}`)?.value) || 0;
            const mKalan = parseFloat(document.getElementById(`merkez_kalan_${u.id}`)?.value) || 0;
            const sSatilan = parseFloat(document.getElementById(`sube_satilan_${u.id}`)?.value) || 0;
            const bSatilan = bakkalToplamlari[u.id] || 0;

            const mFiyat = (guncelFiyatlar[u.id] && guncelFiyatlar[u.id].merkez) ? guncelFiyatlar[u.id].merkez : 0;
            merkezCiroToplam += (mSatilan * mFiyat);

            let toplamSatilan = mSatilan + sSatilan + bSatilan;

            if (u.id === 'EKMEK') {
                toplamSatilan += bimEkmekToplamKatki + personelEkmekEkstra;
            } else if (u.id === 'SIMIT') {
                toplamSatilan += bimSimit;
            }

            const fark = uretimMiktar - (toplamSatilan + mAtilan + mKalan);

            let durumText = '';
            let durumClass = '';

            if (fark === 0) {
                durumText = 'Tam Dengede';
                durumClass = 'status-neutral';
            } else if (fark > 0) {
                durumText = `+${fark} Fazla`;
                durumClass = 'status-positive';
            } else {
                durumText = `${fark} Açık`;
                durumClass = 'status-negative';
            }

            rTbody.innerHTML += `
                <tr>
                    <td><strong>${u.ad}</strong></td>
                    <td>${uretimMiktar}</td>
                    <td>${toplamSatilan}</td>
                    <td>${mAtilan}</td>
                    <td>${mKalan}</td>
                    <td class="${durumClass}">${fark}</td>
                    <td class="${durumClass}">${durumText}</td>
                </tr>`;
        });

        document.getElementById('kasaMerkezCiro').innerText = merkezCiroToplam.toLocaleString('tr-TR') + ' TL';
        document.getElementById('kasaYevmiyeTop').innerText = yevmiyeToplami.toLocaleString('tr-TR') + ' TL';
        
        const digerGider = parseFloat(document.getElementById('digerGiderler').value) || 0;
        const netKasa = merkezCiroToplam - yevmiyeToplami - digerGider;

        const netKasaEl = document.getElementById('kasaNetGünluk');
        netKasaEl.innerText = netKasa.toLocaleString('tr-TR') + ' TL';

        if (netKasa < 0) {
            netKasaEl.style.color = 'var(--danger-color)';
        } else {
            netKasaEl.style.color = 'var(--success-color)';
        }
    }

    // --- KAYIT VE GERİ YÜKLEME (BACKUP & RESTORE) MODÜLÜ ---
    function ekranVerisiKaydet(ekranNo) {
        const tarih = document.getElementById(`tarih_ekran${ekranNo}`) ? document.getElementById(`tarih_ekran${ekranNo}`).value : document.getElementById('sistemTarihi').value;
        const bolum = document.getElementById(`bolum_ekran${ekranNo}`) ? document.getElementById(`bolum_ekran${ekranNo}`).value : 'GENEL';

        if (!tarih) {
            alert('Lütfen kayıt için tarih seçiniz!');
            return;
        }

        const kayitAnahtari = `FirinKayıt_Ekran${ekranNo}_${tarih}_${bolum}`;
        
        let veri = {
            ekranNo: ekranNo,
            tarih: tarih,
            bolum: bolum,
            kayitZamani: new Date().toLocaleString('tr-TR')
        };

        if (ekranNo === 3) veri.personeller = personeller;
        else if (ekranNo === 4) veri.stok = { alim: document.getElementById('stokAlim').value, tuketim: document.getElementById('stokTuketim').value };
        else if (ekranNo === 5) {
            veri.uretim = {};
            urunler.forEach(u => veri.uretim[u.id] = document.getElementById(`uretim_input_${u.id}`)?.value || 0);
        } else if (ekranNo === 8) {
            veri.bim = {
                ekmek: document.getElementById('bim_Ekmek').value,
                simitEkmek: document.getElementById('bim_SimitEkmek').value,
                buyukEkmek: document.getElementById('bim_BuyukEkmek').value,
                simit: document.getElementById('bim_Simit').value
            };
        }

        localStorage.setItem(kayitAnahtari, JSON.stringify(veri));
        alert(`[Ekran ${ekranNo}] Verileri Başarıyla Kaydedildi!\nTarih: ${tarih}\nBölüm: ${bolum}`);
    }

    function gecmisYedekIndir() {
        let tumVeriler = {};
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.startsWith('FirinKayıt_')) {
                tumVeriler[key] = JSON.parse(localStorage.getItem(key));
            }
        }

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tumVeriler, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `Firin_Bereket_Yedek_${document.getElementById('sistemTarihi').value}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    }

    function gecmisYedekYukle(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(e) {
            try {
                const yuklenenVeriler = JSON.parse(e.target.result);
                Object.keys(yuklenenVeriler).forEach(key => {
                    localStorage.setItem(key, JSON.stringify(yuklenenVeriler[key]));
                });
                alert('Geçmiş kayıtlar başarıyla sisteme geri yüklendi!');
                location.reload();
            } catch (err) {
                alert('Geçersiz yedek dosyası!');
            }
        };
        fileReader.readAsText(event.target.files[0]);
    }

    function ekranDegistir(tabId) {
        document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

        document.getElementById(tabId).classList.add('active');

        const btns = document.querySelectorAll('.tab-btn');
        btns.forEach(btn => {
            if (btn.getAttribute('onclick').includes(tabId)) {
                btn.classList.add('active');
            }
        });
    }

    window.onload = function() {
        dinamikVerileriYukle();
        tabloOlustur();
        hesaplaHepsini();
    };
</script>

</body>
</html>
