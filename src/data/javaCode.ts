/**
 * Java ile Ters Üçgen Çizimi Kaynak Kodları ve Bilgileri
 * İmza: Enes Öztürk
 */

export interface CodeSnippet {
  id: string;
  title: string;
  filename: string;
  description: string;
  code: string;
}

export const JAVA_CLASSIC_CODE = `/**
 * =======================================================
 * Proje: Java ile Yıldızlar (*) ile Ters Üçgen Çizimi
 * Geliştirici / İmza: Enes Öztürk
 * Açıklama: Kullanıcıdan basamak sayısını alarak döngüler
 *           aracılığıyla ekrana simetrik ters üçgen çizer.
 * =======================================================
 */

import java.util.Scanner;

public class TersUcgen {
    public static void main(String[] args) {
        // Kullanıcıdan veri almak için Scanner nesnesi oluşturuluyor
        Scanner scanner = new Scanner(System.in);

        System.out.println("=========================================");
        System.out.println("   JAVA İLE TERS ÜÇGEN ÇİZİM PROGRAMI    ");
        System.out.println("   İmza: Enes Öztürk                     ");
        System.out.println("=========================================\\n");

        // Basamak sayısı kullanıcıdan isteniyor
        System.out.print("Basamak Sayısı : ");
        int basamakSayisi = scanner.nextInt();

        System.out.println(); // Boş satır

        // Dış Döngü: Her bir satır için (0'dan basamakSayisi - 1'e kadar)
        for (int i = 0; i < basamakSayisi; i++) {
            
            // 1. İç Döngü: Satır başındaki boşlukları (space) yazar
            // Her satırda satır indeksi (i) kadar boşluk bırakılır
            for (int j = 0; j < i; j++) {
                System.out.print(" ");
            }

            // 2. İç Döngü: Yıldızları (*) yazar
            // Her satırda [2 * (basamakSayisi - i) - 1] adet yıldız yazdırılır
            for (int k = 0; k < (2 * (basamakSayisi - i) - 1); k++) {
                System.out.print("*");
            }

            // Bir sonraki satıra geçiş
            System.out.println();
        }

        // Program bitişi ve imza
        System.out.println("\\n-----------------------------------------");
        System.out.println("Program başarıyla tamamlandı.");
        System.out.println("İmza: Enes Öztürk");
        System.out.println("=========================================");

        scanner.close();
    }
}`;

export const JAVA_LEFT_ALIGNED_CODE = `/**
 * =======================================================
 * Proje: Sola Dayalı Ters Dik Üçgen (Alternatif)
 * Geliştirici / İmza: Enes Öztürk
 * =======================================================
 */

import java.util.Scanner;

public class SolaDayaliTersUcgen {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("--- Sola Dayalı Ters Üçgen (İmza: Enes Öztürk) ---");
        System.out.print("Basamak Sayısı : ");
        int n = input.nextInt();
        System.out.println();

        // Basamak sayısından 1'e doğru azalan tek döngü varyantı
        for (int i = n; i >= 1; i--) {
            // Yıldız sayısı formülü: 2 * i - 1
            for (int k = 1; k <= (2 * i - 1); k++) {
                System.out.print("*");
            }
            System.out.println();
        }

        System.out.println("\\nİmza: Enes Öztürk");
        input.close();
    }
}`;

export const JAVA_WHILE_LOOP_CODE = `/**
 * =======================================================
 * Proje: While Döngüsü ile Ters Üçgen Çizimi
 * Geliştirici / İmza: Enes Öztürk
 * =======================================================
 */

import java.util.Scanner;

public class WhileTersUcgen {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Basamak Sayısı : ");
        int basamak = scanner.nextInt();

        int i = 0;
        while (i < basamak) {
            // Boşluklar
            int j = 0;
            while (j < i) {
                System.out.print(" ");
                j++;
            }

            // Yıldızlar
            int k = 0;
            int yildizSayisi = 2 * (basamak - i) - 1;
            while (k < yildizSayisi) {
                System.out.print("*");
                k++;
            }

            System.out.println();
            i++;
        }

        System.out.println("\\nHazırlayan: Enes Öztürk");
        scanner.close();
    }
}`;

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'classic',
    title: 'Standart Ters Piramit (Simetrik)',
    filename: 'TersUcgen.java',
    description: 'Boşluk + Yıldız kombinasyonu ile merkezlenmiş, klasik piramit ters üçgen çizimi.',
    code: JAVA_CLASSIC_CODE,
  },
  {
    id: 'left',
    title: 'Sola Dayalı Ters Üçgen',
    filename: 'SolaDayaliTersUcgen.java',
    description: 'Başında boşluk olmadan doğrudan sola dayalı azalan tek sayılı yıldız satırları.',
    code: JAVA_LEFT_ALIGNED_CODE,
  },
  {
    id: 'while',
    title: 'While Döngüsü ile Ters Üçgen',
    filename: 'WhileTersUcgen.java',
    description: 'for döngüsü yerine while döngüsü ile sayaç kontrolü yapılarak çizilen alternatif çözüm.',
    code: JAVA_WHILE_LOOP_CODE,
  },
];
