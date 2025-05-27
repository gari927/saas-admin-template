-- Migration number: 0004    2024-xx-xxTxx:xx:xxZ
DROP TABLE IF EXISTS pdf_strengths;

CREATE TABLE pdf_strengths (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_name TEXT NOT NULL UNIQUE,
    strength_1 TEXT,
    strength_2 TEXT,
    strength_3 TEXT,
    strength_4 TEXT,
    strength_5 TEXT,
    strength_6 TEXT,
    strength_7 TEXT,
    strength_8 TEXT,
    strength_9 TEXT,
    strength_10 TEXT,
    strength_11 TEXT,
    strength_12 TEXT,
    strength_13 TEXT,
    strength_14 TEXT,
    strength_15 TEXT,
    strength_16 TEXT,
    strength_17 TEXT,
    strength_18 TEXT,
    strength_19 TEXT,
    strength_20 TEXT,
    strength_21 TEXT,
    strength_22 TEXT,
    strength_23 TEXT,
    strength_24 TEXT,
    strength_25 TEXT,
    strength_26 TEXT,
    strength_27 TEXT,
    strength_28 TEXT,
    strength_29 TEXT,
    strength_30 TEXT,
    strength_31 TEXT,
    strength_32 TEXT,
    strength_33 TEXT,
    strength_34 TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_pdf_strengths_updated_at 
    AFTER UPDATE ON pdf_strengths
    BEGIN
        UPDATE pdf_strengths 
        SET updated_at = CURRENT_TIMESTAMP
        WHERE id = NEW.id;
    END; 

INSERT INTO pdf_strengths (
  file_name,
  strength_1, strength_2, strength_3, strength_4, strength_5, strength_6, strength_7, strength_8, strength_9, strength_10,
  strength_11, strength_12, strength_13, strength_14, strength_15, strength_16, strength_17, strength_18, strength_19, strength_20,
  strength_21, strength_22, strength_23, strength_24, strength_25, strength_26, strength_27, strength_28, strength_29, strength_30,
  strength_31, strength_32, strength_33, strength_34
) VALUES
(
  'chiba-jun-ALL_34.pdf',
  '親密性','慎重さ','最上志向','分析思考','戦略性','公平性','調和性','内省','コミュニケーション','目標志向',
  '規律性','指令性','未来志向','責任感','着想','アレンジ','自己確信','学習欲','個別化','自我',
  '達成欲','活発性','適応性','社交性','収集心','信念','運命思考','原点思考','共感性','競争性',
  '成長促進','回復志向','ポジティブ','包含'
),
(
  '室屋-次郎-ALL_34.pdf',
  '着想','最上志向','運命思考','戦略性','活発性','ポジティブ','コミュニケーション','自己確信','親密性','信念',
  '適応性','共感性','内省','成長促進','未来志向','個別化','アレンジ','指令性','分析思考','原点思考',
  '責任感','学習欲','調和性','慎重さ','社交性','競争性','達成欲','自我','目標志向','収集心',
  '包含','回復志向','規律性','公平性'
); 