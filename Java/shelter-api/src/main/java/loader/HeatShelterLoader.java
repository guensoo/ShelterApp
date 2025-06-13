package loader;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.shelter.shelter_api.Service.HeatShelterService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class HeatShelterLoader implements CommandLineRunner {

    private final HeatShelterService heatShelterService;

    @Override
    public void run(String... args) {
        System.out.println("🚀 HeatShelterLoader 시작!"); // 시작 로그
        try {
            heatShelterService.fetchAndSaveFromApi();
            System.out.println("✅ HeatShelterLoader API 호출 및 저장 완료."); // 성공 로그
        } catch (Exception e) {
            System.err.println("❌ HeatShelterLoader 실행 중 오류 발생: " + e.getMessage());
            e.printStackTrace(); // 전체 오류 로그
        }
        System.out.println("🏁 HeatShelterLoader 종료."); // 종료 로그
    }
}