package loader;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.shelter.shelter_api.Service.ColdShelterService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ColdShelterLoader implements CommandLineRunner {

    private final ColdShelterService coldShelterService;

    @Override
    public void run(String... args) {
        System.out.println("🚀 ColdShelterLoader 시작!"); // 1단계 로그
        try {
            // ❗ 메서드명 리팩토링 후 변경된 이름 사용
            coldShelterService.fetchAndSaveFromApi();
            System.out.println("✅ ColdShelterLoader API 호출 및 저장 완료."); // 3단계 로그
        } catch (Exception e) {
            System.err.println("❌ ColdShelterLoader 실행 중 오류 발생: " + e.getMessage()); // 2단계 로그 (오류 메시지)
            e.printStackTrace(); // 전체 스택 트레이스 출력
        }
        System.out.println("🏁 ColdShelterLoader 종료."); // 최종 종료 로그
    }
}