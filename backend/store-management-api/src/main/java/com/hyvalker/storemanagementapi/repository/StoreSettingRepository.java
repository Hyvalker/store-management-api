package com.hyvalker.storemanagementapi.repository;

import com.hyvalker.storemanagementapi.model.StoreSetting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreSettingRepository extends JpaRepository<StoreSetting, String> {
}
